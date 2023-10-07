import fs from "node:fs";
import readline from "node:readline/promises";
import UserData from "./types/user-data";

function Database() {
  this.filePath = "assets/data.txt";
  this.size = 0;
}

Database.prototype.addNewNode = function (param: UserData): void {
  throw new Error("구현체에서 호출해주세요.");
};

Database.prototype.findNode = function (key: string) {
  throw new Error("구현체에서 호출해주세요.");
};

Database.prototype.printAllNode = function (): void {
  throw new Error("구현체에서 호출해주세요.");
};

Database.prototype.removeNode = function (key: string): void {
  throw new Error("구현체에서 호출해주세요.");
};

Database.prototype.loadList = function (param: {
  fsParam: typeof fs;
  readlineParam: typeof readline;
}): void {
  const readline = param.readlineParam.createInterface({
    input: param.fsParam.createReadStream(this.filePath, { encoding: "utf8" }),
  });

  readline.on("line", (line) => {
    this.addNewNode(JSON.parse(line));
  });

  readline.on("close", () => {
    if (!this.getSize()) {
      console.error("> INFO: 저장된 데이터가 존재하지 않습니다.");
      return;
    }

    console.log("> INFO: (데이터 파일 → 데이터베이스) 복제 완료하였습니다.");
  });
};

Database.prototype.saveList = function (fsParam: typeof fs): fs.WriteStream {
  const stream = fsParam.createWriteStream(this.filePath);

  if (!this.getSize()) {
    console.error("> INFO: 저장할 데이터가 존재하지 않습니다.");
    stream.end();
  }

  stream.on("finish", () => {
    console.log("> INFO: (데이터 파일 ← 데이터베이스) 복제 완료하였습니다.");
    process.exit(0);
  });

  return stream;
};

Database.prototype.getSize = function (): number {
  return this.size;
};

export default Database;

function Database() {
  this.filePath = "assets/data.txt";
  this.size = 0;
}

Database.prototype.addNewNode = function ({ name, phone }) {
  throw new Error("구현체에서 호출해주세요.");
};

Database.prototype.findNode = function (key) {
  throw new Error("구현체에서 호출해주세요.");
};

Database.prototype.printAllNode = function () {
  throw new Error("구현체에서 호출해주세요.");
};

Database.prototype.removeNode = function (key) {
  throw new Error("구현체에서 호출해주세요.");
};

Database.prototype.loadList = function ({ fs, readlinePromises }) {
  const readline = readlinePromises.createInterface({
    input: fs.createReadStream(this.filePath, { encoding: "utf8" }),
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

Database.prototype.saveList = function (fs) {
  const stream = fs.createWriteStream(this.filePath);

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

Database.prototype.getSize = function () {
  return this.size;
};

module.exports = Database;

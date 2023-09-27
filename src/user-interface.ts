const fs = require("node:fs");
const readlinePromises = require("node:readline/promises");
const database = require("./trie");
const Database = require("./database");

function UserInterface(database, fs, readlinePromises) {
  this.database = database instanceof Database ? database : null;

  if (!this.database) {
    throw new Error("데이터베이스가 존재하지 않습니다.");
  }

  this.database.loadList({ fs, readlinePromises });
}

UserInterface.prototype.add = function (faker) {
  const name = faker.person.fullName();
  const phone = faker.phone.number();

  const node = this.database.findNode(name);

  if (node) {
    console.error(`> ERR: ${name}의 정보가 중복됩니다.`);
    return;
  }

  this.database.addNewNode({ name, phone });
  console.log(
    `> INFO: { name: ${name}, phone: ${phone} } 정보가 저장되었습니다.`
  );
};

UserInterface.prototype.search = function (name) {
  const node = this.database.findNode(name);

  if (!node) {
    console.error(`> ERR: ${name}의 정보가 존재하지 않습니다.`);
    return;
  }

  console.log(
    `> INFO: ${JSON.stringify(node.getUserData())} 정보가 존재합니다.`
  );
};

UserInterface.prototype.printAll = function () {
  this.database.printAllNode();

  console.log(`>\n> 총 개수: ${this.database.getSize()}`);
};

UserInterface.prototype.remove = function (name) {
  const node = this.database.findNode(name);

  if (!node) {
    console.error(`> ERR: ${name}의 정보가 존재하지 않습니다.`);
    return;
  }

  const userData = node.getUserData();
  this.database.removeNode(name);

  console.log(`> INFO: ${JSON.stringify(userData)} 정보를 삭제합니다.`);
};

UserInterface.prototype.run = function ({ faker, fs, readlinePromises }) {
  const readline = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\n> [1] Add [2] Search [3] Print all [4] Remove [0] Exit\n",
    terminal: false,
  });

  readline.prompt();

  readline.on("line", async (line) => {
    switch (line.trim()) {
      case "1":
        this.add(faker);
        break;
      case "2": {
        const name = await readline.question("> 이름을 입력해주세요: ");
        this.search(name.trim());

        break;
      }
      case "3":
        this.printAll();
        break;
      case "4": {
        const name = await readline.question("> 이름을 입력해주세요: ");
        this.remove(name.trim());

        break;
      }
      case "0":
        readline.close();
        break;
      default:
        console.error("> ERR: 입력값이 유효하지 않습니다.");
    }

    readline.prompt();
  });

  readline.on("close", () => {
    this.database.saveList(fs);
  });

  readline.on("SIGINT", () => {
    this.database.saveList(fs);
  });
};

module.exports = new UserInterface(database, fs, readlinePromises);

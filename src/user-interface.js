const { faker } = require("@faker-js/faker");
const readlinePromises = require("readline/promises");
const database = require("./single-linked-list");

const readline = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "\n> [1] Add [2] Search [3] Print all [4] Remove [0] Exit\n",
});

function UserInterface({ database, readline, faker }) {
  this.database = database;
  this.readline = readline;
  this.faker = faker;
}

UserInterface.prototype.add = function () {
  const name = this.faker.person.fullName();
  const phone = this.faker.phone.number();

  const node = this.database.findNode(name);

  if (node) {
    console.error(`> ERR: ${name}의 정보가 중복됩니다.`);
    return;
  }

  this.database.addNewNode(name, phone);
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
    `> INFO: { name: ${node.name}, phone: ${node.phone} } 정보가 존재합니다.`
  );
};

UserInterface.prototype.printAll = function () {
  // TODO: UI측 잘못이 database에 손상을 일으킬 수 있다.
  let cur = this.database.getHeadNode();
  let i = 0;

  while (cur) {
    console.log(`> ${i}: { name: ${cur.name}, phone: ${cur.phone} }`);
    i += 1;
    cur = cur.next;
  }
};

UserInterface.prototype.remove = function (name) {
  const node = this.database.findNode(name);

  if (!node) {
    console.error(`> ERR: ${name}의 정보가 존재하지 않습니다.`);
    return;
  }

  this.database.removeNode(name);
  console.log(
    `> INFO: { name: ${node.name}, phone: ${node.phone} } 정보를 삭제합니다.`
  );
};

UserInterface.prototype.run = function () {
  this.readline.prompt();

  this.readline.on("line", async (line) => {
    switch (line.trim()) {
      case "1":
        this.add();
        break;
      case "2": {
        const name = await this.readline.question("> 이름을 입력해주세요: ");
        this.search(name.trim());

        break;
      }
      case "3":
        this.printAll();
        break;
      case "4": {
        const name = await this.readline.question("> 이름을 입력해주세요: ");
        this.remove(name.trim());

        break;
      }
      case "0":
        this.readline.close();
        break;
      default:
        console.error("> ERR: 입력값이 유효하지 않습니다.");
    }

    this.readline.prompt();
  });

  this.readline.on("close", () => {
    this.database.saveList();
  });

  this.readline.on("SIGINT", () => {
    this.database.saveList();
  });
};

module.exports = new UserInterface({ database, readline, faker });

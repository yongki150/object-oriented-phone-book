import fs from "node:fs";
import readline from "node:readline/promises";
import { faker } from "@faker-js/faker";
import database from "./trie";
import TrieNode from "./trie/trie-node";
import Database from "./database";

type UserInterface = {
  database: Database;
  add(param: typeof faker): void;
  search(name: string): void;
  printAll(): void;
  remove(name: string): void;
  run(param: {
    fakerParam: typeof faker;
    fsParam: typeof fs;
    readlineParam: typeof readline;
  }): void;
};

const UserInterface = function (
  this: UserInterface,
  database: Database,
  fsParam: typeof fs,
  readlineParam: typeof readline
) {
  this.database = database;
  this.database.loadList({ fsParam, readlineParam });
} as any as {
  new (
    database: Database,
    fsParam: typeof fs,
    readlineParam: typeof readline
  ): UserInterface;
};

UserInterface.prototype.add = function (param: typeof faker): void {
  const name: string = param.person.fullName();
  const phone: string = param.phone.number();

  const node: TrieNode = this.database.findNode(name);

  if (node) {
    console.error(`> ERR: ${name}의 정보가 중복됩니다.`);
    return;
  }

  this.database.addNewNode({ name, phone });
  console.log(
    `> INFO: { name: ${name}, phone: ${phone} } 정보가 저장되었습니다.`
  );
};

UserInterface.prototype.search = function (name: string): void {
  const node: TrieNode = this.database.findNode(name);

  if (!node) {
    console.error(`> ERR: ${name}의 정보가 존재하지 않습니다.`);
    return;
  }

  console.log(
    `> INFO: ${JSON.stringify(node.getUserData())} 정보가 존재합니다.`
  );
};

UserInterface.prototype.printAll = function (): void {
  this.database.printAllNode();

  console.log(`>\n> 총 개수: ${this.database.getSize()}`);
};

UserInterface.prototype.remove = function (name: string): void {
  const node: TrieNode = this.database.findNode(name);

  if (!node) {
    console.error(`> ERR: ${name}의 정보가 존재하지 않습니다.`);
    return;
  }

  const userData = node.getUserData();
  this.database.removeNode(name);

  console.log(`> INFO: ${JSON.stringify(userData)} 정보를 삭제합니다.`);
};

UserInterface.prototype.run = function (param: {
  fakerParam: typeof faker;
  fsParam: typeof fs;
  readlineParam: typeof readline;
}): void {
  const readline: readline.Interface = param.readlineParam.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\n> [1] Add [2] Search [3] Print all [4] Remove [0] Exit\n",
    terminal: false,
  });

  readline.prompt();

  readline.on("line", async (line) => {
    switch (line.trim()) {
      case "1":
        this.add(param.fakerParam);
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
    this.database.saveList(param.fsParam);
  });

  readline.on("SIGINT", () => {
    this.database.saveList(param.fsParam);
  });
};

export default new UserInterface(database, fs, readline);

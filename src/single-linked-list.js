const fs = require("fs");
const readline = require("readline");

function ListNode({ name, phone }) {
  this.name = name;
  this.phone = phone;
  this.next = null;
}

function SingleLinkedList({ fs, readline }) {
  this.head = null;
  this.fs = fs;
  this.readline = readline;
  this.filePath = "assets/data.txt";
}

SingleLinkedList.prototype.addNewNode = function (name, phone) {
  const newNode = new ListNode({ name, phone });

  if (!this.head) {
    this.head = newNode;
    return;
  }

  newNode.next = this.head.next;
  this.head.next = newNode;
};

SingleLinkedList.prototype.findNode = function (name) {
  let cur = this.head;

  while (cur) {
    if (cur.name === name) {
      return cur;
    }

    cur = cur.next;
  }
};

SingleLinkedList.prototype.removeNode = function (name) {
  let prev = null;
  let cur = this.head;

  if (!cur.next) {
    this.head = null;
  }

  while (cur.next) {
    if (prev && cur.name === name) {
      prev.next = cur.next;
    } else {
      prev = cur;
    }

    cur = cur.next;
  }
};

SingleLinkedList.prototype.loadList = function () {
  const readline = this.readline.createInterface({
    input: this.fs.createReadStream(this.filePath, { encoding: "utf8" }),
  });

  readline.on("line", (line) => {
    this.addNewNode(JSON.parse(line));
  });

  readline.on("close", () => {
    if (!this.head) {
      console.error("> INFO: 저장된 데이터가 존재하지 않습니다.");
      return;
    }

    console.log("> INFO: (데이터 파일 → 데이터베이스) 복제 완료하였습니다.");
  });
};

SingleLinkedList.prototype.saveList = function () {
  if (!this.head) {
    console.error("> INFO: 저장할 데이터가 존재하지 않습니다.");
    return;
  }

  let cur = this.head;
  const stream = this.fs.createWriteStream(this.filePath);

  while (cur) {
    stream.write(JSON.stringify(cur.userData) + "\n");
    cur = cur.next;
  }

  stream.end();

  stream.on("finish", () => {
    console.log("> INFO: (데이터 파일 ← 데이터베이스) 복제 완료하였습니다.");
    process.exit(0);
  });
};

SingleLinkedList.prototype.getHeadNode = function () {
  return this.head;
};

module.exports = new SingleLinkedList({ fs, readline });

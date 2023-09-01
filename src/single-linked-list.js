const fs = require("fs/promises");
const data = require("../data.json");

function ListNode({ name, phone }) {
  this.name = name;
  this.phone = phone;
  this.next = null;
}

function SingleLinkedList({ fs, data }) {
  this.head = null;
  this.fs = fs;
  this.data = data;
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
  if (!Object.keys(this.data).length) {
    console.error("> INFO: 저장된 데이터가 존재하지 않습니다.");
    return;
  }

  this.head = this.data;
  console.log("> INFO: (데이터 파일 → 데이터베이스) 복제 완료하였습니다.");
};

SingleLinkedList.prototype.saveList = async function () {
  if (!this.head) {
    console.error("> INFO: 저장할 데이터가 존재하지 않습니다.");
    await this.fs.writeFile("data.json", JSON.stringify({}));

    return;
  }

  await this.fs.writeFile("data.json", JSON.stringify(this.head));

  console.log("> INFO: (데이터 파일 ← 데이터베이스) 복제 완료하였습니다.");
};

SingleLinkedList.prototype.getHeadNode = function () {
  return this.head;
};

module.exports = new SingleLinkedList({ fs, data });

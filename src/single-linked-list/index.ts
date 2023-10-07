import fs from "node:fs";
import readline from "node:readline/promises";
import Database from "../database";
import ListNode from "./list-node";
import UserData from "../types/user-data";

function SingleLinkedList() {
  Database.call(this);

  this.head = null;
}

SingleLinkedList.prototype = Object.create(Database.prototype);
SingleLinkedList.prototype.constructor = SingleLinkedList;

SingleLinkedList.prototype.addNewNode = function (param: UserData): void {
  const newNode = new ListNode(param);

  if (!this.head) {
    this.head = newNode;
    this.size += 1;
    return;
  }

  newNode.setNext(this.head);
  this.head = newNode;
  this.size += 1;
};

SingleLinkedList.prototype.findNode = function (
  name: string
): typeof ListNode | void {
  let cur: typeof ListNode = this.head;

  while (cur) {
    if (cur.getName() === name) {
      return cur;
    }

    cur = cur.getNext();
  }
};

SingleLinkedList.prototype.printAllNode = function (): void {
  let cur: typeof ListNode = this.head;
  let i: number = 1;

  while (cur) {
    console.log(`> ${i}: ${JSON.stringify(cur.getUserData())}`);
    i += 1;

    cur = cur.getNext();
  }
};

SingleLinkedList.prototype.removeNode = function (name: string): void {
  let prev = null;
  let cur: typeof ListNode = this.head;

  if (!cur.getNext()) {
    this.head = null;
  }

  while (cur) {
    if (prev && cur.getName() === name) {
      prev.setNext(cur.getNext());
    } else {
      prev = cur;
    }

    cur = cur.getNext();
  }

  this.size -= 1;
};

SingleLinkedList.prototype.loadList = function (param: {
  fsParam: typeof fs;
  readlineParam: typeof readline;
}): void {
  Database.prototype.loadList.call(this, param);
};

SingleLinkedList.prototype.saveList = function (fsParam: typeof fs): void {
  const stream: fs.WriteStream = Database.prototype.saveList.call(
    this,
    fsParam
  );
  let cur: typeof ListNode = this.head;

  while (cur) {
    stream.write(JSON.stringify(cur.getUserData()) + "\n");
    cur = cur.getNext();
  }

  stream.end();
};

export default new SingleLinkedList();

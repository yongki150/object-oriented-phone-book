const Database = require("../database");
const ListNode = require("./list-node");

function SingleLinkedList() {
  Database.call(this);

  this.head = null;
}

SingleLinkedList.prototype = Object.create(Database.prototype);
SingleLinkedList.prototype.constructor = SingleLinkedList;

SingleLinkedList.prototype.addNewNode = function ({ name, phone }) {
  const newNode = new ListNode({ name, phone });

  if (!this.head) {
    this.head = newNode;
    this.size += 1;
    return;
  }

  newNode.setNext(this.head);
  this.head = newNode;
  this.size += 1;
};

SingleLinkedList.prototype.findNode = function (name) {
  let cur = this.head;

  while (cur) {
    if (cur.getName() === name) {
      return cur;
    }

    cur = cur.getNext();
  }
};

SingleLinkedList.prototype.printAllNode = function () {
  let cur = this.head;
  let i = 1;

  while (cur) {
    console.log(`> ${i}: ${JSON.stringify(cur.getUserData())}`);
    i += 1;

    cur = cur.getNext();
  }
};

SingleLinkedList.prototype.removeNode = function (name) {
  let prev = null;
  let cur = this.head;

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

SingleLinkedList.prototype.loadList = function ({ fs, readlinePromises }) {
  Database.prototype.loadList.call(this, { fs, readlinePromises });
};

SingleLinkedList.prototype.saveList = function (fs) {
  const stream = Database.prototype.saveList.call(this, fs);
  let cur = this.head;

  while (cur) {
    stream.write(JSON.stringify(cur.getUserData()) + "\n");
    cur = cur.getNext();
  }

  stream.end();  
};

module.exports = new SingleLinkedList();

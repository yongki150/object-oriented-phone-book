const ListNode = require("./list-node");

function SingleLinkedList() {
  this.head = null;
  this.filePath = "assets/data.txt";
}

SingleLinkedList.prototype.addNewNode = function ({ name, phone }) {
  const newNode = new ListNode({ name, phone });

  if (!this.head) {
    this.head = newNode;
    return;
  }

  newNode.setNext(this.getHeadNode());
  this.head = newNode;
};

SingleLinkedList.prototype.findNode = function (name) {
  let cur = this.getHeadNode();

  while (cur) {
    if (cur.getName() === name) {
      return cur;
    }

    cur = cur.getNext();
  }
};

SingleLinkedList.prototype.removeNode = function (name) {
  let prev = null;
  let cur = this.getHeadNode();

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
};

SingleLinkedList.prototype.loadList = function ({ fs, readlinePromises }) {
  const readline = readlinePromises.createInterface({
    input: fs.createReadStream(this.filePath, { encoding: "utf8" }),
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

SingleLinkedList.prototype.saveList = function (fs) {
  if (!this.head) {
    console.error("> INFO: 저장할 데이터가 존재하지 않습니다.");
    return;
  }

  let cur = this.head;
  const stream = fs.createWriteStream(this.filePath);

  while (cur) {
    stream.write(JSON.stringify(cur.getUserData()) + "\n");
    cur = cur.getNext();
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

module.exports = new SingleLinkedList();

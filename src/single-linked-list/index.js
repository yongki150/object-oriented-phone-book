const ListNode = require("./list-node");

function SingleLinkedList() {
  this.head = null;
  this.filePath = "assets/data.txt";
  this.size = 0;
}

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

SingleLinkedList.prototype.getSize = function () {
  return this.size;
};

module.exports = new SingleLinkedList();

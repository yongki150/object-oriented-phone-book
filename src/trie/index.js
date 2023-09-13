const TrieNode = require("./trie-node");

function Trie() {
  this.root = new TrieNode();
  this.filePath = "assets/data.txt";
  this.size = 0;
}

Trie.prototype.addNewNode = function ({ name, phone }) {
  let cur = this.root;

  for (const each of name) {
    if (!cur.getChild(each)) {
      cur.setChild(each);
    }

    cur = cur.getChild(each);
  }

  cur.setIsEndOfWord(true);
  cur.setUserData({ name, phone });
  this.size += 1;
};

Trie.prototype.findNode = function (word) {
  let cur = this.root;

  for (const each of word) {
    const child = cur.getChild(each);

    if (!child) {
      return;
    }

    cur = child;
  }

  return cur.getIsEndOfWord() ? cur : undefined;
};

Trie.prototype.printAllNode = function (node = this.root) {
  if (node.getIsEndOfWord()) {
    console.log(`> ${JSON.stringify(node.getUserData())}`);
    return;
  }

  for (const [, child] of node.children) {
    this.printAllNode(child);
  }
};

Trie.prototype.removeNode = function (word, node = this.root, idx = 0) {
  if (idx === word.length) {
    if (node.getIsEndOfWord()) {
      node.setIsEndOfWord(false);
      node.deleteUserData();
      this.size -= 1;
    }

    if (node.getChildrenSize() === 0) {
      return true;
    }

    return false;
  }

  const c = word[idx];
  const child = node.getChild(c);

  if (!child) {
    return false;
  }

  const shouldDeleteChild = this.removeNode(word, child, idx + 1);

  if (shouldDeleteChild) {
    node.deleteChild(c);

    if (node.getChildrenSize() === 0) {
      return true;
    }
  }

  return false;
};

Trie.prototype.loadList = function ({ fs, readlinePromises }) {
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

Trie.prototype.saveList = function (fs) {
  const traverseNode = (stream, node) => {
    if (node.getIsEndOfWord()) {
      stream.write(JSON.stringify(node.getUserData()) + "\n");
      return;
    }

    for (const [, child] of node.children) {
      traverseNode(stream, child);
    }
  };

  if (!this.getSize()) {
    console.error("> INFO: 저장할 데이터가 존재하지 않습니다.");
    return;
  }

  const stream = fs.createWriteStream(this.filePath);
  traverseNode(stream, this.root);
  stream.end();

  stream.on("finish", () => {
    console.log("> INFO: (데이터 파일 ← 데이터베이스) 복제 완료하였습니다.");
    process.exit(0);
  });
};

Trie.prototype.getSize = function () {
  return this.size;
};

module.exports = new Trie();

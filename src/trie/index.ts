import Database from "../database";
import TrieNode from "./trie-node";

function Trie() {
  Database.call(this);

  this.root = new TrieNode();
}

Trie.prototype = Object.create(Database.prototype);
Trie.prototype.constructor = Trie;

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
  return Database.prototype.loadList.call(this, { fs, readlinePromises });
};

Trie.prototype.saveList = function (fs) {
  const stream = Database.prototype.saveList.call(this, fs);

  const traverseNode = (stream, node) => {
    if (node.getIsEndOfWord()) {
      stream.write(JSON.stringify(node.getUserData()) + "\n");
      return;
    }

    for (const [, child] of node.children) {
      traverseNode(stream, child);
    }
  };

  traverseNode(stream, this.root);
  stream.end();
};

export default new Trie();

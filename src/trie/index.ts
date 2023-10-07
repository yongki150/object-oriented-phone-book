import fs from "node:fs";
import readline from "node:readline/promises";
import Database from "../database";
import TrieNode from "./trie-node";
import UserData from "../types/user-data";

function Trie() {
  Database.call(this);

  this.root = new TrieNode();
}

Trie.prototype = Object.create(Database.prototype);
Trie.prototype.constructor = Trie;

Trie.prototype.addNewNode = function (param: UserData): void {
  const { name, phone } = param;
  let cur: typeof TrieNode = this.root;

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

Trie.prototype.findNode = function (word: string): typeof TrieNode | void {
  let cur: typeof TrieNode = this.root;

  for (const each of word) {
    const child = cur.getChild(each);

    if (!child) {
      return;
    }

    cur = child;
  }

  return cur.getIsEndOfWord() ? cur : undefined;
};

Trie.prototype.printAllNode = function (
  node: typeof TrieNode = this.root
): void {
  if (node.getIsEndOfWord()) {
    console.log(`> ${JSON.stringify(node.getUserData())}`);
    return;
  }

  for (const [, child] of node.children) {
    this.printAllNode(child);
  }
};

Trie.prototype.removeNode = function (
  word: string,
  node: typeof TrieNode = this.root,
  idx: number = 0
): boolean {
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

  const c: string = word[idx];
  const child: typeof TrieNode = node.getChild(c);

  if (!child) {
    return false;
  }

  const shouldDeleteChild: boolean = this.removeNode(word, child, idx + 1);

  if (shouldDeleteChild) {
    node.deleteChild(c);

    if (node.getChildrenSize() === 0) {
      return true;
    }
  }

  return false;
};

Trie.prototype.loadList = function (param: {
  fsParam: typeof fs;
  readlineParam: typeof readline;
}): void {
  Database.prototype.loadList.call(this, param);
};

Trie.prototype.saveList = function (fsParam: typeof fs): void {
  const stream: fs.WriteStream = Database.prototype.saveList.call(
    this,
    fsParam
  );

  const traverseNode = (stream: fs.WriteStream, node: typeof TrieNode) => {
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

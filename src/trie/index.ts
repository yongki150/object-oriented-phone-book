import fs from "node:fs";
import readline from "node:readline/promises";
import Database from "../database";
import TrieNode from "./trie-node";
import UserData from "../types/user-data";

interface Trie extends Database {
  root: TrieNode;
  addNewNode(param: UserData): void;
  findNode: ((word: string) => TrieNode | void) & Database["findNode"];
  printAllNode: ((node: TrieNode) => void) & Database["printAllNode"];
  removeNode: ((word: string, node: TrieNode, idx: number) => boolean) &
    Database["removeNode"];
  loadList(param: { fsParam: typeof fs; readlineParam: typeof readline }): void;
  saveList: ((fsParam: typeof fs) => void) & Database["saveList"];
}

const Trie = function (this: Trie) {
  Database.call(this);

  this.root = new TrieNode();
} as any as { new (): Trie };

Trie.prototype = Object.create(Database.prototype);
Trie.prototype.constructor = Trie;

Trie.prototype.addNewNode = function (this: Trie, param: UserData): void {
  const { name, phone } = param;
  let cur: TrieNode = this.root;

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

Trie.prototype.findNode = function (this: Trie, word: string): TrieNode | void {
  let cur: TrieNode = this.root;

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
  this: Trie,
  node: TrieNode = this.root
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
  this: Trie,
  word: string,
  node: TrieNode = this.root,
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
  const child: TrieNode = node.getChild(c);

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

Trie.prototype.loadList = function (
  this: Trie,
  param: {
    fsParam: typeof fs;
    readlineParam: typeof readline;
  }
): void {
  Database.prototype.loadList.call(this, param);
};

Trie.prototype.saveList = function (this: Trie, fsParam: typeof fs): void {
  const stream: fs.WriteStream = Database.prototype.saveList.call(
    this,
    fsParam
  );

  const traverseNode = (stream: fs.WriteStream, node: TrieNode) => {
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

export default Trie;

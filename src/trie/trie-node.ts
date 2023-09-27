import type { userData } from "../types/user-data";

function TrieNode() {
  this.children = new Map();
  this.isEndOfWord = false;
}

TrieNode.prototype.getUserData = function (): userData {
  return this.userData;
};

TrieNode.prototype.setUserData = function (param: userData): void {
  this.userData = param;
};

TrieNode.prototype.deleteUserData = function (): void {
  delete this.userData;
};

TrieNode.prototype.getChild = function (char: string): typeof TrieNode {
  return this.children.get(char);
};

TrieNode.prototype.setChild = function (char: string): void {
  this.children.set(char, new TrieNode());
};

TrieNode.prototype.deleteChild = function (char: string): void {
  this.children.delete(char);
};

TrieNode.prototype.getChildrenSize = function (): number {
  return this.children.size;
};

TrieNode.prototype.getIsEndOfWord = function (): boolean {
  return this.isEndOfWord;
};

TrieNode.prototype.setIsEndOfWord = function (isEndOfWord: boolean): void {
  this.isEndOfWord = isEndOfWord;
};

export default TrieNode;

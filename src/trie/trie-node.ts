import UserData from "../types/user-data";

type TrieNode = {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  userData?: UserData;
  getUserData(): UserData;
  setUserData(param: UserData): void;
  deleteUserData(): void;
  getChild(char: string): TrieNode;
  setChild(char: string): void;
  deleteChild(char: string): void;
  getChildrenSize(): number;
  getIsEndOfWord(): boolean;
  setIsEndOfWord(isEndOfWord: boolean): void;
};

const TrieNode = function (this: TrieNode) {
  this.children = new Map();
  this.isEndOfWord = false;
} as any as { new (): TrieNode };

TrieNode.prototype.getUserData = function (this: TrieNode): UserData | void {
  return this.userData;
};

TrieNode.prototype.setUserData = function (
  this: TrieNode,
  param: UserData
): void {
  this.userData = param;
};

TrieNode.prototype.deleteUserData = function (this: TrieNode): void {
  delete this.userData;
};

TrieNode.prototype.getChild = function (
  this: TrieNode,
  char: string
): TrieNode | void {
  return this.children.get(char);
};

TrieNode.prototype.setChild = function (this: TrieNode, char: string): void {
  this.children.set(char, new TrieNode());
};

TrieNode.prototype.deleteChild = function (this: TrieNode, char: string): void {
  this.children.delete(char);
};

TrieNode.prototype.getChildrenSize = function (this: TrieNode): number {
  return this.children.size;
};

TrieNode.prototype.getIsEndOfWord = function (this: TrieNode): boolean {
  return this.isEndOfWord;
};

TrieNode.prototype.setIsEndOfWord = function (
  this: TrieNode,
  isEndOfWord: boolean
): void {
  this.isEndOfWord = isEndOfWord;
};

export default TrieNode;

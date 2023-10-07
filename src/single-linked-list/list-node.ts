import UserData from "../types/user-data";

type ListNode = {
  userData: UserData;
  next: ListNode | null;
  getUserData(): UserData;
  getName(): string;
  getNext(): ListNode;
  setNext(node: ListNode): void;
};

const ListNode = function (this: ListNode, param: UserData) {
  this.userData = param;
  this.next = null;
} as any as { new (param: UserData): ListNode };

ListNode.prototype.getUserData = function (): UserData {
  return this.userData;
};

ListNode.prototype.getName = function (): string {
  return this.userData.name;
};

ListNode.prototype.getNext = function (): ListNode {
  return this.next;
};

ListNode.prototype.setNext = function (node: ListNode): void {
  this.next = node;
};

export default ListNode;

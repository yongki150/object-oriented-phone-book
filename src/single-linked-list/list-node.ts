import type { userData } from "../types/user-data";

function ListNode(param: userData) {
  this.userData = param;
  this.next = null;
}

ListNode.prototype.getUserData = function (): userData {
  return this.userData;
};

ListNode.prototype.getName = function (): string {
  return this.userData.name;
};

ListNode.prototype.getNext = function (): typeof ListNode {
  return this.next;
};

ListNode.prototype.setNext = function (node: typeof ListNode): void {
  this.next = node;
};

export default ListNode;

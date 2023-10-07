import UserData from "../types/user-data";

function ListNode(param: UserData) {
  this.userData = param;
  this.next = null;
}

ListNode.prototype.getUserData = function (): UserData {
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

function ListNode({ name, phone }) {
  this.userData = {
    name,
    phone,
  };

  this.next = null;
}

ListNode.prototype.getUserData = function () {
  return this.userData;
};

ListNode.prototype.getName = function () {
  return this.userData.name;
};

ListNode.prototype.getNext = function () {
  return this.next;
};

ListNode.prototype.setNext = function (node) {
  this.next = node;
};

module.exports = ListNode;

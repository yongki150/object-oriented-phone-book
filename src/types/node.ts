import SingleLinkedList from "../single-linked-list";
import ListNode from "../single-linked-list/list-node";
import Trie from "../trie";
import TrieNode from "../trie/trie-node";

type Node<T> = T extends Trie
  ? TrieNode
  : T extends SingleLinkedList
  ? ListNode | null
  : object;

export default Node;

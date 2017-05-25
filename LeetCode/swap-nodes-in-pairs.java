/*Given a linked list, swap every two adjacent nodes and return its head.

For example,
Given 1->2->3->4, you should return the list as 2->1->4->3.

Your algorithm should use only constant space. You may not modify the values in the list, only nodes itself can be changed.

Subscribe to see which companies asked this question.
*/

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode swapPairs(ListNode head) {
        if(head==null){
            return null;
        }
        if(head.next == null){
            return head;
        }
        ListNode h = new ListNode(0);
		h.next = head;
		head = h;
		ListNode temp = null;
		
		while(head.next != null && head.next.next != null){
			temp = head.next;
			head.next = head.next.next;
			temp.next = head.next.next;
			head.next.next =  temp;
			head = temp;
		}
		return h.next;
    }
}
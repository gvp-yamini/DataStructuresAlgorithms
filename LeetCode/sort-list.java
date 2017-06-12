/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode merger(ListNode l, ListNode r){
		ListNode p = new ListNode(0);
		ListNode h =p;
		while(l != null && r != null){
			if(l.val <= r.val){
				p.next = l;
				l = l.next;
			}else{
				p.next = r;
				r = r.next; 
			}
			p = p.next;
		}
		if(l != null){
			p.next = l;
		}
		if(r != null){
			p.next = r;
		}
		return h.next;
	}
    public ListNode sortList(ListNode head) {
        if(head == null || head.next == null){
			return head;
		}
        ListNode slow=head,fast=head,l1end=null;
        while(fast != null && fast.next != null){
			l1end = slow;
			slow = slow.next;
			fast = fast.next.next;
        }
       l1end.next = null;
       ListNode l1 = sortList(head);
       ListNode l2 = sortList(slow);
       return merger(l1,l2);
    }
}
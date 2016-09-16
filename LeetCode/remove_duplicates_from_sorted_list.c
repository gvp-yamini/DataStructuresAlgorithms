/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* deleteDuplicates(struct ListNode* head) {
    struct ListNode *p,*q; 
    if(!head){
		return head;
	}
	p = head;
	q = head->next;
	while(q){
		if(p->val == q->val){
			q = q->next;
		}else{
			p->next = q;
			p = p->next;
			q = q->next;
		}
	}
	p->next = NULL;
	return head;
}
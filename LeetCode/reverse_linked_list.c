/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode *p=head,*q,*temp;
    if(!head || head->next == NULL){
        return head;
    }
    q = head->next;
    p->next = NULL;
    while(q->next!=NULL){
        temp = q->next;
        q->next = p;
        p = q;
        q = temp;
    }
    q->next = p;
    return q;
}
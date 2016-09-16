/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
bool hasCycle(struct ListNode *head) {
    struct ListNode *p=NULL,*q=NULL;
    p=head;
    q=head;
    while(q&&p&&p->next){
            q = q->next;
            p = p->next->next;
        if(q==p){
            return true;
            break;
        }
    }
    return false;
}
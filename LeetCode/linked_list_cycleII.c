/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode *detectCycle(struct ListNode *head) {
    struct ListNode *fast,*slow;
    slow = head;
    fast = head;
    while(fast !=NULL && fast->next != NULL && fast->next->next !=NULL){
        slow = slow->next;
        fast = fast->next->next;
        if(slow==fast){
               fast = head;
             while(fast != slow){
                fast = fast->next;
                slow = slow->next;
             }
    return slow;
        }
    }
    return;
}
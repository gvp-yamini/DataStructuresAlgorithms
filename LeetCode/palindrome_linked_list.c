/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
bool isPalindrome(struct ListNode* head) {
    if(!head || head->next == NULL){
       return true;
    }
    struct ListNode *mid,*temp;
    temp = head;
    mid = head;
    while(temp->next !=NULL && temp->next->next != NULL){
        temp = temp->next->next;
        mid = mid->next;
    }
    if(mid->next !=NULL && mid->next->next != NULL){
         mid = mid->next->next;
    }
    temp = head;
    while(mid->next != NULL){
        if(mid->val != temp->val){
            return false;
        }
        mid = mid->next;
        temp = temp->next;
    }
    return true;
}
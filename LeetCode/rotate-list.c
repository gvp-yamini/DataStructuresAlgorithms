/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* rotateRight(struct ListNode* head, int k) {
    if(k==0 || head==NULL || head->next == NULL){
        return head;
    }
    int len = 0;
    int leftItems = 0;
    struct ListNode* tempHead = head;
     struct ListNode *nextHead = NULL,*last=NULL;
    while(tempHead->next !=NULL){
        len++;
        tempHead = tempHead->next;
    }
    last = tempHead;
    if(k>=len){
        k = k%(len+1);
    }
    if(k==0){
        return head;
    }
    leftItems = len - k;
    tempHead = head;
    while(leftItems>0){
        tempHead = tempHead->next;
        leftItems--;
    }
    nextHead = tempHead->next;
    tempHead->next = NULL;
    last->next = head;
    head = nextHead;
    return head;
}
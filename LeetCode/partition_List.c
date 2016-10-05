/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* partition(struct ListNode* head, int x) {
    struct ListNode *listone=NULL,*listtwostart=NULL,*listtwoend=NULL,*temp=NULL;
    temp = head;
    if(head==NULL){
        return; 
    }
    if(head->next==NULL){
        return head;
    }
    while(temp){
        if(temp->val<x){
            if(listone==NULL){
                listone = temp;
                head = listone;
            }else{
                listone->next = temp;
                listone = listone->next;
            }
        }else{
            if(listtwostart==NULL){
                listtwostart = temp;
                listtwoend = temp;
            }else{
                listtwoend->next = temp;
                listtwoend = listtwoend->next;
            }
        }
        temp = temp->next;
    }
    if(listone==NULL && listtwostart!=NULL){
        head = listtwostart;
    }else{
       if(listone !=NULL && listtwostart==NULL){
           listone->next = NULL;
       }else{
       listtwoend->next = NULL;
       listone->next = listtwostart;
       }
    }
    return head;
}
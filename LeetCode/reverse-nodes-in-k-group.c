/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
 
 int hasKelements(struct ListNode* curr,int k){
     int i=0;
     while(curr){
         if(i==k-1){
             return 1;
         }
         i++;
         curr=curr->next;
     }
     return 0;
 }
struct ListNode* reverseKGroup(struct ListNode* head, int k) {
    int counter = 0;
    struct ListNode *temp_head=NULL,*prev=NULL,*temp=NULL,*curr=NULL;
    if(head==NULL || head->next==NULL){
        return head;
    }
    if(k==0 || k==1){
        return head;
    }
    if(!hasKelements(head,k)){
        return head;
    }
   temp_head = (struct ListNode *)malloc(sizeof(struct ListNode));
   temp_head->val = 0;
   temp_head->next = head;
   curr = head;
   prev = temp_head;
   while(hasKelements(curr,k)){
       for(counter=0;counter<k-1;counter++){
                temp = prev -> next;
                prev -> next = curr -> next;
                curr -> next = curr -> next -> next;
                prev -> next -> next = temp; 
       }
       prev = curr;
       curr = prev->next;
   }
   return temp_head->next;
}
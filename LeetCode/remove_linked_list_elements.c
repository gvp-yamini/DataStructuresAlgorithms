/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* removeElements(struct ListNode* head, int val) {
   struct ListNode *helper,*p,*temp;
   if(!head){
       return head;
   }
   helper = (struct ListNode *)malloc(sizeof(struct ListNode));
   helper->val = -1;
   helper->next = head;
   p=helper;
   while(p->next!=NULL){
	   if(p->next->val==val){
		   p->next = p->next->next;
	   }else{
		   p = p->next;
	   }

   }
   return helper->next;
}
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* oddEvenList(struct ListNode* head) {
   struct ListNode *odd,*even,*evenFirst,*temp;
	if(head==NULL){
	  return head;
	}
	odd = head;
	even = head->next;
	evenFirst = even;
	temp = evenFirst;
	while(odd->next != NULL && even->next != NULL && odd !=NULL && even !=NULL){
	  odd->next = even->next;
	  odd = odd->next;
	  even = odd->next;
	  temp->next = even;
	  temp = temp->next;
	}
	if(odd->next == NULL){
	  odd->next = evenFirst;
	}else{
	  temp->next = NULL;
	  odd->next = evenFirst;
	}
	return head;
}
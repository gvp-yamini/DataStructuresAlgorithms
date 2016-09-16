#include "stdafx.h"
#include <stdio.h>
#include "stdlib.h"
#include "conio.h"
struct ListNode* oddEvenList(struct ListNode* head);
struct ListNode {
     int val;
     struct ListNode *next;
  };

void main(){
	struct ListNode *temp1,*temp2,*temp3,*temp4,*temp5,*temp6;
	temp1 = (struct ListNode *)malloc(sizeof(struct ListNode));
	temp1->val = 1;
	temp2 = (struct ListNode *)malloc(sizeof(struct ListNode));
	temp2->val = 2;
	temp3 = (struct ListNode *)malloc(sizeof(struct ListNode));
	temp3->val = 3;
	temp4 = (struct ListNode *)malloc(sizeof(struct ListNode));
	temp4->val = 4;
	temp5 = (struct ListNode *)malloc(sizeof(struct ListNode));
	temp5->val = 5;
	temp6 = (struct ListNode *)malloc(sizeof(struct ListNode));
	temp6->val = 6;
	temp1->next = temp2;
	temp2->next = temp3;
	temp3->next = temp4;
	temp4->next = temp5;
	temp5->next = temp6;
	temp6->next = NULL;
	temp1 = oddEvenList(temp1);
	getch();
}

struct ListNode* oddEvenList(struct ListNode* head) {
   struct ListNode *odd,*even,*evenFirst,*temp;
	if(head==NULL){
	  return head;
	}
	odd = head;
	even = head->next;
	evenFirst = even;
	temp = evenFirst;
	while(odd->next != NULL && even->next !=NULL && odd != NULL && even !=NULL){
	  //printf("%d",odd->val);
	  odd->next = even->next;
	  odd = odd->next;
	  even = odd->next;
	  //printf("%d",temp->val);
	  temp->next = even;
	  temp = temp->next;
	}
	if(odd->next == NULL){
	  temp->next = NULL;
	  odd->next = evenFirst;
	}else{
	  temp->next = NULL;
	  odd->next = evenFirst;
	}
	return head;
}
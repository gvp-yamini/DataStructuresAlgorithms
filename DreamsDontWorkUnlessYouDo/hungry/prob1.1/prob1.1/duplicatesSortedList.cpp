#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

 struct ListNode {
      int val;
      struct ListNode *next;
  };
struct ListNode* deleteDuplicates(struct ListNode* );
void printList(struct ListNode* );
void main(){
	struct ListNode *head = NULL,*curr,*temp;
	int flag=1,num;
	while(flag){
         printf("enter an element\n");
		 scanf("%d",&num);
		 temp = (struct ListNode *)malloc(sizeof(struct ListNode ));
		 temp ->next = NULL;
		 temp ->val = num;
		 if(!head){
			 head = temp;
			 curr = head;
		 }else{
			 curr->next = temp;
			 curr = curr->next;
		 }
		 printf("do you want to continue\n");
		 scanf("%d",&flag);
	}
	printList(head);
	head = deleteDuplicates(head);
	printList(head);
	getch();
}

struct ListNode* deleteDuplicates(struct ListNode* head) {
	struct ListNode *p,*q; 
    if(!head){
		return head;
	}
	p = head;
	q = head->next;
	while(q){
		if(p->val == q->val){
			q = q->next;
		}else{
			p->next = q;
			p = p->next;
			q = q->next;
		}
	}
	p->next = NULL;
	return head;
}

void printList(struct ListNode *head){
	while(head){
		printf("%d-->",head->val);
		head = head->next;
	}
	printf("\n");
}
// Definition for singly-linked list.
#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

 struct ListNode{
     int val;
     struct ListNode *next;
  };
 void printLinkedList(struct ListNode *);
 struct ListNode* removeElements(struct ListNode *,int );
 void main(){
	 struct ListNode *temp,*curr,*head = NULL;
	 int flag=1,num,toDelete;
	 while(flag){
		 printf("enter the value to insert\n");
		 scanf("%d",&num);
		 temp = (struct ListNode *)malloc(sizeof(struct ListNode));
		 temp->val = num;
		 temp->next = NULL;
		 if(head==NULL){
			 head = temp;
			 curr = head;
		 }else{
			 curr->next = temp;
			 curr = curr->next;
		 }
		 printf("do you want to continue\n");
		 scanf("%d",&flag);
	 }
	 printLinkedList(head);
	 printf("enter value to remove\n");
	 scanf("%d",&toDelete);
	 head = removeElements(head,toDelete);
	 printLinkedList(head);
	 getch();
 }
 void printLinkedList(struct ListNode *head){
	 while(head){
		printf("%d->",head->val);
		head = head->next;
	 }
	 printf("\n");
 }
struct ListNode* removeElements(struct ListNode *head, int val) {
   struct ListNode *helper,*p,*temp;
   helper = (struct ListNode *)malloc(sizeof(struct ListNode));
   helper->val = -1;
   helper->next = head;
   p=helper;
   while(p->next!=NULL){
	   if(p->next->val==val){
		   temp = p->next;
		   p = p->next->next;
		   free(temp);
	   }else{
		   p = p->next;
	   }

   }
   return helper->next;
}
#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

typedef struct node{
	int val;
	struct node *next;
}NODE;

NODE* create_node(int );
void printlist(NODE *);
NODE* reverseLinkedList(NODE *);
void main(){
	NODE *curr=NULL,*temp=NULL,*start=NULL,*middle=NULL;
	int ch,choice=1,val,loopOperations=1;
	printf("select operations on linked list");
	printf("\n");
	printf("1.create\n");
	printf("2.insert at first\n");
	printf("3.insert at last\n");
	printf("4.insert in middle\n");
	printf("5.print linked list\n");
	printf("6.delete first element\n");
	printf("7.delete middle element\n");
	printf("8.delete last element\n");
	printf("9.reverse linked list\n");
	while(loopOperations){
      printf("enter choice\n");
	  scanf("%d",&ch);
	switch(ch){
	 case 1:
	   while(choice){
	   printf("enter value to be inserted");
	   scanf("%d",&val);
       temp = create_node(val);
	   if(!start){
		   start = temp;
		   curr = temp;
	   }else{
		   curr->next = temp;
		   curr = temp;
	   }
	   printf("0 or 1 to continue\n");
	   scanf("%d",&choice);
	   }
	   break;
	 case 2:
		 printf("enter element to be inserted at first\n");
		 scanf("%d",&val);
		 temp = create_node(val);
		 curr = temp;
		 temp->next = start;
		 start = curr;
		 break;
	 case 3:
		 printf("enter element to be inserted at last\n");
		 scanf("%d",&val);
		 temp = create_node(val);
		 curr = start;
		 while((curr->next!=NULL)){
			 curr = curr->next;
		 }
		 curr->next = temp;
		 break;
	 case 4:
		 printf("enter element to be inserted at middle\n");
		 scanf("%d",&val);
		 temp = create_node(val);
		 middle = start;
		 curr = start;
		 while((curr->next!=NULL)&&(curr->next->next!=NULL)){
			 curr = curr->next->next;
			 middle=middle->next;
		 }
		 curr =middle->next;
		 middle->next = temp;
		 temp->next = curr;
		 break;
	 case 5:
		 printlist(start);
		 break;
	 case 6:
		 curr = start;
		 start = start->next;
		 free(curr);
		 break;
	 case 7:
		 middle = start;
		 curr = start;
		 while((curr->next!=NULL)&&(curr->next->next!=NULL)){
			 curr = curr->next->next;
			 temp = middle;
			 middle=middle->next;
		 }
		 curr = middle;
		 temp->next = middle->next;
		 free(curr);
		 break;
	 case 8:
		 curr = start;
		 while(curr->next!=NULL){
			 temp = curr;
			 curr = curr->next;
		 }
		 temp->next = NULL;
		 free(curr);
		 break;
	 case 9:
		 start = reverseLinkedList(start);
		 break;
	 default:
		 printf("enter valied option\n");
	}
	printf("loopOperations 0 or 1\n");
	scanf("%d",&loopOperations);
	}

	getch();
}

void printlist(NODE *first){
	while(first){
		printf("%d->",first->val);
		first=first->next;
	}
}
NODE* create_node(int value){
	NODE* temp;
	temp = (NODE *)malloc(sizeof(NODE));
	temp->val = value;
	temp->next = NULL;
	return temp;
}

NODE* reverseLinkedList(NODE *curr){
	NODE *p,*q,*r;
	p=q=r=curr;
	q=p->next;
	r=p->next->next;

	q->next = p;
	p->next = NULL;

	while(r->next!=NULL){
		p=r;
		r=r->next;
		p->next = q;
		q=p;
	}
	r->next = q;
	return r;
}
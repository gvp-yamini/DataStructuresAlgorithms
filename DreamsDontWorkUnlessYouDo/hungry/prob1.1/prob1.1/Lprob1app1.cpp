#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

typedef struct node{
	int val;
	struct node *next;
}NODE;

void printList(NODE *);
NODE* removeduplicates(NODE *);
void main(){
	NODE *temp=NULL,*head=NULL,*curr=NULL;
	int choice=1,value=0;
	while(choice){
		printf("enter value to be inserted\n");
		scanf("%d",&value);
		temp = (NODE *)malloc(sizeof(NODE ));
		temp->val = value;
		temp->next = NULL;
		if(!head){
			head = temp;
			curr = head;
		}
		curr ->next = temp;
		curr = curr->next;
		printf("enter choice 0 or 1\n");
		scanf("%d",&choice);
	}
	printList(head);
	head = removeduplicates(head);
	printf("list after removing duplicates\n");
	removeduplicates(head);
	getch();
}

void printList(NODE *start){
	while(start)
	{
		printf("%d->",start->val);
		start = start->next;
	}
	printf("\n");
}

NODE* removeduplicates(NODE *head){
	NODE *curr,*temp;
	int bitmap = 0;
	curr = head;
	temp = head;
	while(curr->next!=NULL){
		if(!(bitmap&(1<<curr->val))){
			temp = curr;
			curr = curr->next;
			bitmap = bitmap|(1<<curr->val);
		}else{
			temp->next = curr->next;
			free(curr);
			curr = curr->next;
		}

	}
	if(curr->next==NULL){
		if(bitmap&1<<(curr->val)){
			temp->next = NULL;
			free(curr);
		}
	}
	return head;
}

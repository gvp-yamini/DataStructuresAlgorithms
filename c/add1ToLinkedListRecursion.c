#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "stdlib.h"

struct node{
	int val;
	struct node *next;
};

struct node * createLinkedList(int num){
	struct node *temp=NULL,*p=NULL,*head=NULL;
	int m,n=num;
	while(n>0){
		m = n%10;
		n = n/10;
		temp =(struct node *)malloc(sizeof(struct node));
		temp->val = m;
		temp->next=NULL;
		if(p!=NULL){
			temp->next = p;
		}
		p = temp;
	}
	return p;
}
void printList(struct node * head){
	struct node *temp = head;
	while(temp!=NULL){
		printf("%d-->",temp->val);
		temp = temp->next;
	}
	printf("\n");
}
int addHelper(struct node *head){
	if(head==NULL){
		return 1;
	}
	int res = head->val + addHelper(head->next);
    head->val = res%10;
	return res/10;
}
struct node *addOneToList(struct node *head){
	struct node *temp;
	int carry = 0;
	carry = addHelper(head);
	if(carry !=0){
		temp = (struct node *)malloc(sizeof(struct node));
		temp->val = carry;
		temp->next = head;
		head = temp;
	}
	return head;
}

void main(){
	struct node *head=NULL;
	int n = 16999;
	head = createLinkedList(n);
	printList(head);
	head = addOneToList(head);
	printList(head);
	getch();
}
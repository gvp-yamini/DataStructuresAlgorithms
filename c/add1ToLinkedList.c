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
struct node *addOneToList(struct node *head,int l){
	int noneflag = 0,carry=0;
	struct node *temp = head,*prev,*ford,*nineprev,*nine;
	while(temp->next != NULL){
		prev = temp;
		ford = temp->next;
		if(ford->val==9 && noneflag==0){
			nineprev = prev;
			nine = ford;
			noneflag = 1;
		}
		if(ford->val!=9){
			noneflag = 0;
		}
		temp = temp->next;
	}
	if(temp->val ==9){
		carry = 1;
	}else{
		temp->val = temp->val + 1;
	}
	if(ford->val==9 && carry==1){
		temp = nineprev;
		nineprev->val = nineprev->val + 1;
		temp = temp->next;
		while(temp){
			temp->val = 0;
			temp = temp->next;
		}
	}
	if(nineprev==head && carry==1){
		temp = (struct node *)malloc(sizeof(struct node));
		temp->val = 1;
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
	head = addOneToList(head,1);
	printList(head);
	getch();
}
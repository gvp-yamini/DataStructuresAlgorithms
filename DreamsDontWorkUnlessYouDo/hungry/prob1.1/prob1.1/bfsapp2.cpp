#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

typedef struct node{
	int val;
	struct node *left,*right;
}TNODE;

TNODE* createTree(TNODE *,int );
void printPreOrder(TNODE *);
void printLevelOrder(TNODE *);

void main(){
	TNODE *head = NULL;
	int c=1,valT;
	while(1){
		if(c){
			printf("enter value to be inserted\n");
			scanf("%d",&valT);
			head = createTree(head,valT);
			printf("do you want to continue 0 or 1\n");
			scanf("%d",&c);
		}else{
			break;
		}
	}
	printPreOrder(head);
	printLevelOrder(head);
	getch();
}

TNODE * createTree(TNODE *head,int vl){
	if(head==NULL){
		head = (TNODE *)malloc(sizeof(TNODE));
		head->val = vl;
		head->left = NULL;
		head->right = NULL;
	}else if(head->val>=vl){
		head->left = createTree(head->left,vl);
	}else{
		head->right = createTree(head->right,vl);
	}
	return head;
}

void printPreOrder(TNODE *head){
	if(head != NULL){
	printf("%d",head->val);
	printPreOrder(head->left);
	printPreOrder(head->right);
	}
}

void printLevelOrder(TNODE *head){
	TNODE *temp_node;
	int rear,front;
	TNODE *queue;
	temp_node = head;
	if(head==NULL)
		return;
	while(temp_node !=NULL){
		printf("%d",temp_node->val);
	}

}

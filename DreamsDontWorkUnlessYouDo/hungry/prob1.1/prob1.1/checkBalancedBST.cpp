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
bool balancedBST(TNODE *);
int height(TNODE *);

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
	if(balancedBST(head)){
		printf("Balanced BST\n");
	}else{
		printf("Not Balanced BST\n");
	}
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

bool balancedBST(TNODE *head){
	int hLval = height(head->left);
	int hRval = height(head->right);
	if((hLval-hRval)>1){
		return false;
	}else{
		return true;
	}
}

int height(TNODE *head){
	if(head==NULL){
		return 0;
	}
	int lval = height(head->left);
	int rval = height(head->right);
	if(lval>rval){
		return lval + 1;
	}else{
		return rval + 1;
	}
}
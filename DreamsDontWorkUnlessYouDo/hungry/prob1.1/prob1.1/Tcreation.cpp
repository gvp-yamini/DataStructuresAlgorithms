#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

typedef struct node{
	int val;
	struct node *left,*right;
}NODE;

void insert(NODE **,NODE *);
void printTreepreOrder(NODE *);
void insertAnotherWay(NODE **,int );
void printTreeinorder(NODE *);
void printTreepostOrder(NODE *);

void main(){
	NODE *curr=NULL,*root=NULL;
	int i;
	/*for(i=0;i<10;i++){
		curr = (NODE *)malloc(sizeof(NODE));
		curr->val = i;
		curr->left = curr->right = NULL;
		insert(&root,curr);
	}
 printTreepreOrder(root);*/
 for(i=0;i<10;i++){
	 insertAnotherWay(&root,i);
 }
 printf("preorder\n");
 printTreepreOrder(root);
 printf("inorder\n");
 printTreeinorder(root);
 printf("postorder\n");
 printTreepostOrder(root);
 getch();
}

void insertAnotherWay(NODE **root,int i){
	if(!(*root)){
		*root = (NODE *)malloc(sizeof(NODE **));
		(*root)->left = NULL;
		(*root)->right = NULL;
		(*root)->val = i;
		return;
	}
    if((*root)->left == NULL && (*root)->val<=i){
		insertAnotherWay(&(*root)->right,i);
	}else if((*root)->right == NULL && (*root)->val>i){
		insertAnotherWay(&(*root)->left,i);
	}
}

void insert(NODE **root,NODE *curr){
	if(*root==NULL){
		*root = curr;
		return;
	}
	if(curr->val > (*root)->val){
		insert(&(*root)->right,curr);
	}

	if(curr->val < (*root)->val){
		insert(&(*root)->left,curr);
	}
}

void printTreepreOrder(NODE *root){
	printf("%d",root->val);
	if(root->left!=NULL){
		printTreepreOrder(root->left);
	}
	if(root->right!=NULL){
		printTreepreOrder(root->right);
	}
}

void printTreeinorder(NODE *root){
    if(root->left!=NULL){
       printTreeinorder(root->left);
	}
	printf("%d",root->val);
	if(root->right!=NULL){
	   printTreeinorder(root->right);
	}
}

void printTreepostOrder(NODE *root){
	printf("%d",root->val);
	if(root->left!=NULL){
		printTreepostOrder(root->left);
	}
	if(root->right!=NULL){
		printTreepostOrder(root->right);
	}
}
#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"
typedef struct node{
	int val;
	struct node *left,*right;
}NODE;
NODE* createtree(NODE *);
NODE* createNode(NODE *,int );
void printTree(NODE *);
bool sametree(NODE *,NODE *);
void main(){
	NODE *tree1=NULL,*tree2=NULL;
	printf("tree1\n");
	tree1=createtree(tree1);
	printf("tree2\n");
	tree2=createtree(tree2);
	printTree(tree1);
	printTree(tree2);
	if(sametree(tree1,tree2)){
		printf("same tree");
	}else{
		printf("not");
	}
	getch();
}
bool sametree(NODE *p,NODE *q){
	if(p==NULL && q==NULL){
        return true;
    }else if(p!=NULL&&q!=NULL){
        if((p->val == q->val)&&sametree(p->left,q->left)&&sametree(p->right,q->right)){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
NODE* createtree(NODE *head){
	int flag=1,val;
	while(flag){
		printf("enter element to be inserted:\n");
		scanf("%d",&val);
		head=createNode(head,val);
		printf("do you want to continue:\n");
		scanf("%d",&flag);
	}
	return head;
}
NODE* createNode(NODE *head,int val){
	NODE *temp;
	temp = (NODE*)malloc(sizeof(NODE));
	temp->val = val;
	temp->left = NULL;
	temp->right = NULL;
	if(head==NULL){
       head = temp;
	}else if(head->val>val){
		head->left = createNode(head->left,val);
	}else{
		head->right = createNode(head->right,val);
	}
     return head;
}

void printTree(NODE *tree){
	if(tree!=NULL){
		printf("%d",tree->val);
		printTree(tree->left);
		printTree(tree->right);
	}
}
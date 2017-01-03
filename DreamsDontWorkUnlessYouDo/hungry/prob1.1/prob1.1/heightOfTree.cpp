#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

typedef struct node{
  int val;
  struct node *left,*right;
}NODE;

NODE * createTree(NODE *,int );
void printTreeInorder(NODE *);
int heightOfTree(NODE *);

void main(){
	NODE *head=NULL;
    int val,flag = 1;
	while(1){
		if(flag){
          printf("enter value to be inserted\n");
		  scanf("%d",&val);
		  head=createTree(head,val);
		  printf("do you want to continue 0 or 1");
		  scanf("%d",&flag);
		}else{
			break;
		}
	}
	printTreeInorder(head);
	printf("max height of tree %d\n",heightOfTree(head));
	getch();
}

NODE * createTree(NODE *head,int val){
	if(!(head)){
		head = (NODE *)malloc(sizeof(NODE ));
		head->val = val;
		head->left = NULL;
		head->right = NULL;
	}else if(head->val >= val)
  {
	  head->left = createTree(head->left,val);
  }else{
	  head->right = createTree(head->right,val);
  }
	return head;
}

void printTreeInorder(NODE *head){
	if(head != NULL){
	printTreeInorder(head->left);
	printf("%d",head->val);
	printTreeInorder(head->right);
	}
}

int heightOfTree(NODE *head){
	if(!head){
		return 0;
	}
	int lval = heightOfTree(head->left);
	int rval = heightOfTree(head->right);
	if(lval>rval){
		return lval+1;
	}else{
		return rval+1;
	}
}
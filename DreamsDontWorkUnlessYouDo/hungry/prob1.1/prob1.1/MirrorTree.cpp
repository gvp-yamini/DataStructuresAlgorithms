#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

typedef struct node{
	int val;
	struct node *left,*right;
}NODE;

NODE * createTree(NODE *,int );
void preOrderTraversal(NODE *);
NODE * levelOrderTraversal(NODE *);
int heightOfTree(NODE *);
NODE * printLevelOrder(NODE *,int );

void main(){
	NODE *head=NULL;
	int flag = 1,val;
		while(1){
			if(flag){
				printf("enter value to be inserted\n");
				scanf("%d",&val);
				head = createTree(head,val);
				printf("do you want to continue\n");
				scanf("%d",&flag);
			}else{
				break;
			}
	}
	 preOrderTraversal(head);
	 printf("\n");
	 head=levelOrderTraversal(head);
	 printf("\n");
	 preOrderTraversal(head);
	 getch();
}

void preOrderTraversal(NODE *head){
	if(head==NULL)
		return;
	printf("%d",head->val);
	preOrderTraversal(head->left);
	preOrderTraversal(head->right);
}
int heightOfTree(NODE *head){
	if(head==NULL){
		return 0;
	}
	int lVal = heightOfTree(head->left);
	int rVal = heightOfTree(head->right);
	if(lVal > rVal){
		return (lVal+1);
	}else{
		return (rVal+1);
	}
}
NODE * levelOrderTraversal(NODE *head){
	int i;
	int height = heightOfTree(head);
	for(i=1;i<=height;i++){
		head = printLevelOrder(head,i);
	}
	return head;
}
NODE * printLevelOrder(NODE *head,int level){
	NODE * temp=NULL;
	if(head==NULL){
		return head;
	}
	if(level==1){
		  temp = head->left;
          head->left = head->right;
          head->right = temp;
		  return head;
	}
	if(level>1){
		printLevelOrder(head->left,level-1);
		printLevelOrder(head->right,level-1);
	}
}
NODE * createTree(NODE *head,int val){
	if(head==NULL){
		head = (NODE *)malloc(sizeof(NODE ));
		head ->val = val;
		head->right = NULL;
		head->left = NULL;
	}else if(head->val >= val){
		head->left = createTree(head->left,val);
	}else{
		head->right = createTree(head->right,val);
	}
	return head;
}
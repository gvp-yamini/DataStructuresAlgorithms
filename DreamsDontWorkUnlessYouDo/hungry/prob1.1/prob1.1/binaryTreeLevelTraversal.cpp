#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"
struct TreeNode {
     int val;
     struct TreeNode *left;
     struct TreeNode *right;
  };
struct TreeNode* createTree(struct TreeNode *);
int heightOfTree(struct TreeNode *);
void levelOrderTraversal(struct TreeNode *,int );
void main(){
	struct TreeNode *head = NULL;
	int h,i;
	head = createTree(head);
	h = heightOfTree(head);
	for(i=1;i<=h;i++){
		levelOrderTraversal(head,i);
	}
	getch();
}
struct TreeNode* createTree(struct TreeNode * head){
   struct TreeNode *temp1,*temp2,*temp3;
   temp1 = (struct TreeNode*)malloc(sizeof(struct TreeNode));
   temp1 ->val = 2;
   temp1->left = NULL;
   temp1->right = NULL;
   temp2 = (struct TreeNode*)malloc(sizeof(struct TreeNode));
   temp2 ->val = 3;
   temp2->left = NULL;
   temp2->right = NULL;
   temp3 = (struct TreeNode*)malloc(sizeof(struct TreeNode));
   temp3 ->val = 4;
   temp3->left = NULL;
   temp3->right = NULL;
   head = temp1;
   temp1->right = temp2;
   temp2->right = temp3;
   return head;
}

int heightOfTree(struct TreeNode* root){
   if(!root){
	   return 0;
   }
   int l = heightOfTree(root->left);
   int r = heightOfTree(root->right);
   if(l>r){
      return l+1; 
   }else{
      return r+1;
   }
}

void levelOrderTraversal(struct TreeNode *root,int i){
	if(!root){
		return;
	}
	if(i==1){
		printf("%d",root->val);
	}
	if(i>1){
	levelOrderTraversal(root->left,i-1);
	levelOrderTraversal(root->right,i-1);
	}
}
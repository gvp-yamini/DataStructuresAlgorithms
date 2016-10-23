#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "stdlib.h"
struct Treenode{
	int val;
	struct Treenode *left,*right;
};

struct Treenode* insert(struct Treenode *root,int val){
	if(root==NULL){
		root = (struct Treenode *)malloc(sizeof(struct Treenode));
		root->val = val;
		root->left = NULL;
		root->right = NULL;
	}else if(root->val>val){
		root->left = insert(root->left,val);
	}else{
		root->right = insert(root->right,val);
	}
	return root;
}

int kthsmallestElementUtil(struct Treenode* root,int *k){
	if(root==NULL){
		return -1;
	}
	int left = kthsmallestElementUtil(root->left,k);
	if(left !=-1){
		return left;
	}else{
	   if(*k==1){
          return root->val;
	   }
	   (*k)--;
	   return kthsmallestElementUtil(root->right,k);
	}
}
int kthsmallestElement(struct Treenode* root,int k){
	return kthsmallestElementUtil(root,&k);
}

void main(){
	 struct Treenode* root = NULL;
	 root = insert(root,20);
	 root = insert(root,18);
	 root = insert(root,19);
	 root = insert(root,22);
	 root = insert(root,21);
	 root = insert(root,25);
	 root = insert(root,1);
	 printf("%d",kthsmallestElement(root,3));
	 getch();
}
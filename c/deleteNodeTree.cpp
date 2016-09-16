#include "stdafx.h"
#include <stdio.h>
#include "stdlib.h"
#include "conio.h"
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

struct Treenode* findMinValue(struct Treenode *root){
	struct Treenode* temp=root;
	while(root->left != NULL){
		temp = temp->left;
	}
	return temp;
}

struct Treenode* deleteNode(struct Treenode *root,int val){
	struct Treenode *temp;
	if(root == NULL){
		return root;
	}else if(root->val>val){
		root->left = deleteNode(root->left,val);
	}else if(root->val<val){
		root->right = deleteNode(root->right,val);
	}else{
	if(root->left == NULL){
		temp = root;
		root = root->right;
		delete(temp);
		return root;
	 }else if(root->right == NULL){
		temp = root;
		root = root->left;
		delete(temp);
		return root;
	}
	temp = findMinValue(root->right);
	root->val = temp->val;
	root->right = deleteNode(root->right,temp->val);
	}
	return root;
}

void inorder(struct Treenode *root){
	if(root){
      inorder(root->left);
	  printf("%d ",root->val);
	  inorder(root->right);
	}
}

void main(){
     struct Treenode* root = NULL;
	 root = insert(root,15);
	 root = insert(root,18);
	 root = insert(root,17);
	 root = insert(root,20);
	 root = insert(root,6);
	 root = insert(root,7);
	 root = insert(root,13);
	 root = insert(root,9);
	 root = insert(root,3);
	 root = insert(root,4);
	 root = insert(root,2);
	 inorder(root);
	 printf("\n");
	 root = deleteNode(root,17);
	 inorder(root);
	 printf("\n");
	 root = deleteNode(root,6);
	 inorder(root);
	 printf("\n");
	 getch();
}
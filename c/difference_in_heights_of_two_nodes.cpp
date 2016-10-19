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

struct Treenode *lowestCommonAncestor(struct Treenode* root,int c1,int c2){
	if(root==NULL){
		return NULL;
	}
	if(root->val==c1 || root->val==c2){
		return root;
	}
	struct Treenode *l_lca = lowestCommonAncestor(root->left,c1,c2);
	struct Treenode *r_lca = lowestCommonAncestor(root->right,c1,c2);
	if(l_lca && r_lca){
		return root;
	}
	if(r_lca == NULL){
		return l_lca;
	}else{
		return r_lca;
	}
}

int height(struct Treenode * root,int c,int level){
	if(root==NULL){
		return -1;
	}
	if(root->val==c){
		return level;
	}else{
		int l = height(root->left,c,level+1);
		if(l!=-1){
			return l;
		}
		return height(root->right,c,level+1);
	}
}

int differenceInHeights(struct Treenode* root,int c1,int c2){
	if(root==NULL){
		return NULL;
	}
	int height1 = height(root,c1,0);
	printf("height1-->%d\n",height1);
	int height2 = height(root,c2,0);
	printf("height2-->%d\n",height2);
	struct Treenode * lca = lowestCommonAncestor(root,c1,c2);
	int height3 = height(root,lca->val,0);
	printf("height3-->%d\n",height3);
	return height1 + height2 -(2*height3);
}

void main(){
     struct Treenode *temp=NULL,*root = NULL;
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
	 printf("difference id %d\n",differenceInHeights(root,3,2));
	 getch();
}
#include "stdafx.h"
#include "stdio.h"
#include "stdlib.h"
#include "conio.h"

/**
 * Return an array of size *returnSize.
 * Note: The returned array must be malloced, assume caller calls free().
 */
struct node{
	int value;
	struct node *left;
	struct node *right;
	int height;
	int size;
};
struct node * NewNode(int num){
	struct node * node = NULL;
	node = (struct node *)malloc(sizeof(struct node));
	node->value=num;
	node->left = NULL;
	node->right = NULL;
	node->height = 1;
	node->size = 1;
	return node;
}
int size(struct node *node){
	if(!node){
		return 0;
	}
	return node->size;
}
int height(struct node *node){
	if(!node){
		return 0;
	}
	return node->height;
}
int getBalance(struct node *node){
	if(!node){
		return 0;
	}
	return height(node->left) - height(node->right);
}
int max(int a,int b){
	if(a>b){
		return a;
	}
	return b;
}
struct node *rightRotate(struct node *x){
	struct node * y = x->left;
	struct node *t2 = y->right;

	y->right = x;
	x->left = t2;

	x->height = max(height(x->left),height(x->right))+1;
	y->height = max(height(y->left),height(y->right))+1;

	x->size = max(size(x->left),size(x->right))+1;
	y->size = max(size(y->left),size(y->right))+1;

	return y;
}
struct node *leftRotate(struct node *y){
	struct node * x = y->right;
	struct node *t2 = x->left;

	x->left = y;
	y->right = t2;

	x->height = max(height(x->left),height(x->right))+1;
	y->height = max(height(y->left),height(y->right))+1;

	x->size = max(size(x->left),size(x->right))+1;
	y->size = max(size(y->left),size(y->right))+1;

	return x;
}
struct node* insertAVLnode(struct node *node,int num,int *count){
	if(!node){
		return NewNode(num);
	}
	if(node->value>num){
		node->left = insertAVLnode(node->left,num,count);
	}else{
		node->right = insertAVLnode(node->right,num,count);
		*count = *count + size(node->left) + 1;
	}
	node->height = max(height(node->left),height(node->right))+1;
	node->size = max(size(node->left),size(node->right))+1;
	int balance = getBalance(node);
	if(balance>1&&node->left->value>num){
		return rightRotate(node);
	}
	if(balance>1 && node->left->value<num){
		node->left = leftRotate(node->left);
		return rightRotate(node);
	}
	if(balance<-1 && node->right->value<num){
		return leftRotate(node);
	}
	if(balance<-1 && node->right->value>num){
		node->right = rightRotate(node->right);
		return leftRotate(node);
	}

	return node;
}
int* countSmaller(int* nums, int numsSize, int* returnSize) {
	struct node *head = NULL;
	int i;
    int* count = (int *)malloc(sizeof(int )*numsSize);
	for(i=0;i<numsSize;i++){
		count[i]=0;
	}
	for(i=numsSize-1;i>=0;i++){
		head = insertAVLnode(head,nums[i],&count[i]);
	}
	*returnSize = numsSize;
	return count;
}

void main(){
	int a[] = {5,2,6,1};
	int *countarr=0,i;
	countarr = countSmaller(a,4,countarr);
	getch();
}
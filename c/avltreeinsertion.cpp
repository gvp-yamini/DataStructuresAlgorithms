#include "stdafx.h";
#include "stdio.h";
#include "conio.h";
#include "stdlib.h";

struct node{
	int value;
	int height;
	struct node* left;
	struct node* right;
};
int max(int a,int b){
	if(a>b){
		return a;
	}
	return b;
}

void preorderTraversal(struct node *head){
	if(head){
		printf("%d ",head->value);
		preorderTraversal(head->left);
		preorderTraversal(head->right);
	}
}

struct node * newNode(int val){
	struct node * newnode = (struct node *)malloc(sizeof(struct node));
	newnode->left = NULL;
	newnode->right = NULL;
	newnode->height = 1;
	newnode->value = val;
	return newnode;
}
int height(struct node* node){
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
struct node *rightRotate(struct node *y){
	struct node *x = y->left;
	struct node *t1 = x->right;

	x->right = y;
	y->left = t1;
    x->height = max(height(x->right),height(x->left))+1;
	y->height = max(height(y->right),height(y->left))+1;

	return x;
}
struct node * leftRotate(struct node *x){
	struct node *y = x->right;
	struct node *t2 = y->left;
    
	y->left = x;
	x->right = t2;

	x->height = max(height(x->right),height(x->left))+1;
	y->height = max(height(y->right),height(y->left))+1;
	return y;
}
struct node * insert(struct node *node,int num){
	if(!node){
		return newNode(num);
	}
	if(num<node->value){
		node->left = insert(node->left,num); 
	}else{
		node->right = insert(node->right,num);
	}
	node->height = max(height(node->left),height(node->right))+1;
	int balance = getBalance(node);
	if(balance>1 && num<node->left->value){
		return rightRotate(node);
	}
	if(balance<-1 && num>node->right->value){
		return leftRotate(node);
	}

	if(balance>1 && num>node->left->value){
		node->left = leftRotate(node->left);
		return rightRotate(node);
	}

    if(balance<-1 && num<node->right->value){
		node->right = rightRotate(node->right);
		return leftRotate(node);
	}

	return node;
}

void main(){
	struct node *root=NULL;
	root = insert(root, 30);
  root = insert(root, 10);
  root = insert(root, 20);
  root = insert(root, 40);
  root = insert(root, 50);
  root = insert(root, 25);
	preorderTraversal(root);
	getch();
}

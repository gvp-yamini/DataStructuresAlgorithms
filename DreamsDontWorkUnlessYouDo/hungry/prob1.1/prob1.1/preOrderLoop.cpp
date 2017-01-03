#include "stdafx.h"
#include "stdio.h"
#include "stdlib.h"
#include "conio.h"

typedef struct TreeNode {
     int val;
	 struct TreeNode *left;
	 struct TreeNode *right;
}NODE;

int* helper(struct TreeNode* root, int* returnSize,int count){
	returnSize = (int *) realloc(returnSize,count+1);
    while(root!=NULL){
		returnSize[count]=root->val;
        return helper(root->left,returnSize,count++);
        return helper(root->right,returnSize,count++);
    }
}

int* preorderTraversal(struct TreeNode* root, int* returnSize) {
	returnSize = helper(root,returnSize,0);
    return returnSize;
}

void main(){
	int *returnVal=NULL;
	NODE *temp1,*temp2,*temp3;
	temp1 = (NODE *)malloc(sizeof(NODE));
	temp1->val = 1 ;
	temp2 = (NODE *)malloc(sizeof(NODE));
	temp2->val = 2 ;
	temp3 = (NODE *)malloc(sizeof(NODE));
	temp3->val = 3 ;
	temp1->right = temp2;
	temp2->left = temp3;
	temp1->left = NULL;
	temp2->right = NULL;
	temp3->left = NULL;
	temp3->right = NULL;
    returnVal = preorderTraversal(temp1,returnVal);
	getch();
}
#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

struct TreeNode {
     int val;
     struct TreeNode *left;
     struct TreeNode *right;
 };
struct TreeNode* sortedArrayToBST(int *,int );
struct TreeNode* balancedBST(int * ,int ,int );
void preOrder(struct TreeNode*);
void main(){
	struct TreeNode* head=NULL;
	int arr[9]={1,2,3,4,5,6,7,8};
	head = sortedArrayToBST(arr,8);
	preOrder(head);
	getch();
}
struct TreeNode* sortedArrayToBST(int* nums, int numsSize) {
  struct TreeNode* head=NULL;
  head = balancedBST(nums,0,numsSize-1);
  return head;
}
void preOrder(struct TreeNode* head){
	if(head!=NULL){
		printf("%d",head->val);
		preOrder(head->left);
		preOrder(head->right);
	}
}

struct TreeNode* balancedBST(int* nums,int low,int high){
    struct TreeNode* head;
    if(low<=high){
        int mid = (low + high)/2;
        head = (struct TreeNode* )malloc(sizeof(struct TreeNode));
        head->val = nums[mid];
        head->left = NULL;
        head->right = NULL;
        head->left = balancedBST(nums,low,mid-1);
        head->right = balancedBST(nums,mid+1,high);
    }else{
        return NULL;
    }
    return head;
}
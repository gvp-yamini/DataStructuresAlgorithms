/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
struct TreeNode* balancedBST(int* ,int ,int );
struct TreeNode* sortedArrayToBST(int* nums, int numsSize) {
  struct TreeNode* head=NULL;
  head = balancedBST(nums,0,numsSize-1);
  return head;
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
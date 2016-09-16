/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
bool BSTUtils(struct TreeNode *root,int min,int max);
 
bool isValidBST(struct TreeNode* root) {
    return (BSTUtils(root,INT_MIN,INT_MAX));
}

bool BSTUtils(struct TreeNode *root,int min,int max){
    if(root==NULL){
        return true;
    }
    if(root->val < min || root->val > max){
        return false;
    }
    return BSTUtils(root->left,min,root->val-1) && BSTUtils(root->right,root->val+1,max);
}
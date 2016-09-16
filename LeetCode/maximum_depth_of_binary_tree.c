/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
int maxDepth(struct TreeNode* root) {
    if(root == NULL){
        return 0;
    }
    int lval = maxDepth(root->left);
    int rval = maxDepth(root->right);
    if(lval>rval){
        return lval+1;
    }else{
        return rval+1;
    }
}
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {
    if(root==NULL){
        return NULL;
    }
    if(root==p || root==q){
        return root;
    }
    struct TreeNode* left_ances = lowestCommonAncestor(root->left,p,q);
    struct TreeNode* right_ances = lowestCommonAncestor(root->right,p,q);
    if(left_ances && right_ances){
        return root;
    }
    if(left_ances==NULL){
       return right_ances; 
    }else{
        return left_ances;
    }
}
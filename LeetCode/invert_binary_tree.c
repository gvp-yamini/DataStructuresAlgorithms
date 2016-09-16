/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
struct TreeNode* invertTree(struct TreeNode* root) {
  struct TreeNode* temp=NULL;  
  if(root==NULL){
      return root;
  }else{
      temp = root->left;
      root->left = root->right;
      root->right = temp;
  }
  invertTree(root->left);
  invertTree(root->right);
  return root;
}

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
bool isBalanced(struct TreeNode* root) {
    if(root == NULL){
        return true;
    }
	int hLval = height(root->left);
	int hRval = height(root->right);
	if((hLval-hRval)>1||(hLval-hRval)<-1){
		return false;
	}else{
		return isBalanced(root->left) && isBalanced(root->right);
	}
}

int height(struct TreeNode* head){
	if(head==NULL){
		return 0;
	}
	int lval = height(head->left);
	int rval = height(head->right);
	if(lval>rval){
		return lval + 1;
	}else{
		return rval + 1;
	}
}
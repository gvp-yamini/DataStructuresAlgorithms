/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
vector<int> inorderTraversal(TreeNode* root) {
        vector<int> result;  
        vector<TreeNode*> stck;
		result=inorderTraversal(root,stck,result);
		return result;
    }
vector<int> inorderTraversal(TreeNode* root,vector<TreeNode*> &stck,vector<int> &result){
		TreeNode *curr,*temp;
		if(root==NULL){
			return result;
		}
		curr = root;
		while(stck.size()>0||curr != NULL){
		while(curr!= NULL){
			stck.push_back(curr);
			curr = curr->left;
		}
		temp = stck.back();
		stck.pop_back();
		result.push_back(temp->val);
		curr = temp->right;
		}
		return result;
		
	}
};
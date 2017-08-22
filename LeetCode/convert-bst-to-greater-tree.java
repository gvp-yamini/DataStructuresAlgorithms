/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    int prev;
    
    public void postorder(TreeNode root){
        if(root != null){
            postorder(root.right);
            root.val = root.val + prev;
            prev = root.val;
            postorder(root.left);
        }
    }
    public TreeNode convertBST(TreeNode root) {
        postorder(root);
        return root;
    }
}
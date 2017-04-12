/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
	int min = Integer.MAX_VALUE;
	 TreeNode prev;
    public void traversal(TreeNode root){
    	if(root==null){
    		return;
    	}
    	if(root != null){
    		traversal(root.left);
    		if(prev !=null){
    		 min=Math.min(min, root.val-prev.val);
    		}
    		prev = root;
    		traversal(root.right);
    	}
	}
    public int getMinimumDifference(TreeNode root) {
		traversal(root);
		return min;
    }
}
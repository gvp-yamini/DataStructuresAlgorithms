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
    int k;
    public long kthSmallestUtil(TreeNode root){
        if(root == null){
           return Long.MAX_VALUE;
        }
        
        long left = kthSmallestUtil(root.left);
        if(left != Long.MAX_VALUE){
            return left;
        }else{
             if(k==1){
               return root.val; 
             }
             k--;
            return kthSmallestUtil(root.right);
        }
        
    }
    public int kthSmallest(TreeNode root, int k) {
        this.k = k;
        return (int)kthSmallestUtil(root);
    }
}
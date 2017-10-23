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
      int maxval;
      public int max(int a,int b){
        if(a>b){
            return a;
        }
        return b;
    }
    
    public int maxsum(TreeNode root){
        if(root == null){
           return 0; 
        }
        
        int l = max(0,maxsum(root.left));
        int r = max(0,maxsum(root.right));
        
        maxval = max(maxval,l+r+root.val);
        
        return max(l,r)+root.val;
    }
   
     public int maxPathSum(TreeNode root) {
         maxval = Integer.MIN_VALUE;
         maxsum(root);
         return maxval;
     }
}
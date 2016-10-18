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
    private int min(int a,int b){
        if(a>b){
            return b;
        }
        return a;
    }
    private int height(TreeNode root){
        if(root==null){
            return Integer.MAX_VALUE;
        }else if(root !=null && root.left==null && root.right==null){
               return 0;
            }else{
            int l = height(root.left);
            int r = height(root.right);
            return min(l,r)+1;
        }
    }
    public int minDepth(TreeNode root) {
        if(root == null){
            return 0;
        }
        
        int rooth = height(root);
        
        return rooth+1;
    }
}
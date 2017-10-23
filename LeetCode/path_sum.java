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
    boolean flag= false;
    public void pathSumUtil(TreeNode root,int prev,int sum){
        if(root != null){
            root.val = root.val + prev;
            if(root.val==sum && root.left==null && root.right==null){
                flag = true;
                return;
            }
            prev = root.val;
            pathSumUtil(root.left,prev,sum);
            pathSumUtil(root.right,prev,sum);
        }
    }
    public boolean hasPathSum(TreeNode root, int sum) {
       pathSumUtil(root,0,sum); 
       return flag;
    }
}
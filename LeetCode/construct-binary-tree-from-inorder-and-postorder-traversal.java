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
    int index;
    private int search(int[] inorder,int target,int start,int end){
        int i;
        for(i=start;i<=end;i++){
            if(target==inorder[i]){
                break;
            }
        }
        return i;
    }
    private TreeNode buildTreeUtil(int[] inorder, int[] postorder,int start,int end){
        if(start>end){
          return null;
        }
        TreeNode node = new TreeNode(postorder[index]);
        node.left = null;
        node.right = null;
        index--;
        
        if(start==end){
            return node;
        }
        int Iindex = search(inorder,node.val,start,end);
            
        node.right = buildTreeUtil(inorder,postorder,Iindex+1,end);
        node.left = buildTreeUtil(inorder,postorder,start,Iindex-1);
        return node;
    }
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        int n = inorder.length;
        index = n-1;
        return buildTreeUtil(inorder,postorder,0,n-1);
    }
}
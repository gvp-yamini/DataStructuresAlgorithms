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
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<Integer>();
        if(root == null){
            return result;
        }
        Stack s1 = new Stack();
		
		s1.push(root);
		while(!s1.empty()){
			TreeNode temp = (TreeNode)s1.pop();
			result.add(temp.val);
			if(temp.right != null)
			   s1.push(temp.right);
			
			if(temp.left != null)
			  s1.push(temp.left);
		}
        return result;
    }
}
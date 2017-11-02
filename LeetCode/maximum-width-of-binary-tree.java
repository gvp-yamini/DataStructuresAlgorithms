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
    public int levelOrdertraversal(TreeNode root){
        Queue<TreeNode> q = new LinkedList<>();
        HashMap<TreeNode,Integer> hm = new HashMap<TreeNode,Integer>();
        int start=0,end=0,max=0;
        q.add(root);
        hm.put(root,1);
        while(q.size() !=0){
            int levellen = q.size();
            int i = 0;
            start=0;
            end = 0;
            while(i<levellen){
                TreeNode temp = (TreeNode)q.remove();
                if(i==0){
                    start = hm.get(temp);
                }
                if(i==levellen-1){
                    end = hm.get(temp);
                }
                if(temp.left != null){
                      q.add(temp.left);
                      hm.put(temp.left,hm.get(temp)*2);
                }
                if(temp.right != null){
                    q.add(temp.right);
                    hm.put(temp.right,hm.get(temp)*2+1);
                }
                i++;
            }
            if(end-start+1>max){
                max = end-start+1;
            }
        }
        return max;
    }
    public int widthOfBinaryTree(TreeNode root) {
        if(root==null){
            return 0;
        }
        return levelOrdertraversal(root);
    }
}
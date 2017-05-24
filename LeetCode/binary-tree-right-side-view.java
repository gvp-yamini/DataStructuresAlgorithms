public class Solution {
    public void rightTraversalUtil(TreeNode root, List<Integer> res,int depth){
        if(root == null){
            return;
        }
        
        if(res.size()==depth){
		  res.add(root.val);
        }
		rightTraversalUtil(root.right,res,depth+1);
    	rightTraversalUtil(root.left,res,depth+1);
	}
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
    	if(root==null){
    		return res;
    	}
    	
    	if(root != null && root.left == null && root.right == null){
    		res.add(root.val);
    		return res;
    	}
    	
    	if(root != null){
        	rightTraversalUtil(root,res,0);
    	}
    	
    	return res;
    }
}
public class Solution {
	TreeNode firstnode = null;
	TreeNode secondnode = null;
	TreeNode prevnode = new TreeNode(Integer.MIN_VALUE);
	TreeNode successorfirst = null;
	
    public void recoverTree(TreeNode root) {
        inorderTraversal(root);
		int temp = firstnode.val;
		firstnode.val = secondnode.val;
		secondnode.val = temp;
    }
		public void inorderTraversal(TreeNode root){
		if(root == null){
		    return;
		}
	    while(root != null){
			if(root.left != null){
				TreeNode temp = root.left;
				while(temp.right != null && temp.right != root){
					temp = temp.right;
				}
				if(temp.right != null){
					if(prevnode !=null && prevnode.val > root.val){
						if(firstnode==null){
							firstnode = prevnode;
							secondnode = root;
						}else{
							secondnode = root;
						}
					}
					prevnode = root;
					temp.right = null;
					root = root.right;
				}else{
					temp.right = root;
					root = root.left;
				}
			}else{
				if(prevnode !=null && prevnode.val > root.val){
						if(firstnode==null){
							firstnode = prevnode;
							secondnode = root;
						}else{
							secondnode = root;
						}
					}
				prevnode = root;
				root = root.right;
			}
		}
		
	}
}
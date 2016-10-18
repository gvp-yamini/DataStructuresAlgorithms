package linkedList;

class TreeNode{
	int value;
	TreeNode left,right;
	
	TreeNode(int value){
		value = this.value;
		left=right=null;
	}
}

public class DiameterOfTree {
	TreeNode root;
	
	DiameterOfTree(int value){
		root = new TreeNode(value);
	}
	
	DiameterOfTree(){
		root = null;
	}
	private int max(int a,int b){
		if(a>b){
			return a;
		}
		return b;
	}
	private int height(TreeNode head){
		if(head==null){
			return 0;
		}else{
			int l = height(head.left);
			int r = height(head.right);
			return max(l,r)+1;
		}
	}
	   public int diameter(TreeNode head){
		    if(head==null){
		    	return 0;
		    }
	    	int left = height(head.left);
	    	int right = height(head.right);
	    	
	    	int ldiameter = diameter(head.left);
	    	int rdiameter = diameter(head.right);
	    	
	    	return max(max(ldiameter,rdiameter),left+right+1);
	    }
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		DiameterOfTree tree = new DiameterOfTree();
		  tree.root = new TreeNode(1);
	        tree.root.left = new TreeNode(2);
	        tree.root.right = new TreeNode(3);
	        tree.root.left.right = new TreeNode(5);
	        tree.root.left.left = new TreeNode(4);
	        tree.root.right.left = new TreeNode(6);
	        tree.root.right.right = new TreeNode(7);
	        tree.root.right.right.right = new TreeNode(11);
	        tree.root.left.right.left = new TreeNode(8);
	        tree.root.left.right.right = new TreeNode(9);
	        System.out.println(tree.diameter(tree.root));
	}

}

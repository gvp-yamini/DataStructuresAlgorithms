package linkedList;

class TreeNode{
	 int value;
	 TreeNode left,right;
	 
	 TreeNode(int value){
		 this.value = value;
		 left = right = null;
	 }
}

public class BoundaryTreeNodes {
    TreeNode root;
    
    BoundaryTreeNodes(){
    	root = null;
    }
    
    BoundaryTreeNodes(int key){
    	root = new TreeNode(key);
    }
	/**
	 * @param args
	 */
    public void bfs(TreeNode head){
    	int he = height(head);
    	
    	for(int i=1;i<=he;i++){
    		bfsUtil(head,i,i);
    	}
    }
    private void bfsUtil(TreeNode head,int level,int h){
    	if(level==0){
    		return;
    	}else if(level==1){
    		System.out.println(h+"->"+head.value);
    	}else{
    		if(head.left !=null){
    		bfsUtil(head.left,level-1,h);
    		}
    		if(head.right !=null){
    		bfsUtil(head.right,level-1,h);
    		}
    	}
    }
	private int height(TreeNode head){
		if(head==null){
			return 0;
		}
		int l = height(head.left);
		int r = height(head.right);
		if(l>r){
			return l + 1;
		}else{
			return r + 1;
		}
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		BoundaryTreeNodes tree = new BoundaryTreeNodes();
        tree.root = new TreeNode(1);
        tree.root.left = new TreeNode(2);
        tree.root.right = new TreeNode(3);
        tree.root.left.right = new TreeNode(5);
        tree.root.left.left = new TreeNode(4);
        tree.root.right.left = new TreeNode(6);
        tree.root.right.right = new TreeNode(7);
        tree.root.left.right.left = new TreeNode(8);
        tree.root.left.right.right = new TreeNode(9);
        tree.bfs(tree.root);
	}

}

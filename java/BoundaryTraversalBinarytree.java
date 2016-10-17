package linkedList;

class TreeNod{
	 int value;
	 TreeNod left,right;
	 
	 TreeNod(int value){
		 this.value = value;
		 left = right = null;
	 }
}

public class BoundaryTraversalBinarytree {
	  TreeNod root;
	    
	  BoundaryTraversalBinarytree(){
	    	root = null;
	    }
	    
	  BoundaryTraversalBinarytree(int key){
	    	root = new TreeNod(key);
	    }
	  
	  private void printLeftBoundary(TreeNod head,int print){
		  if(head != null){
			  if(head.left !=null){
			  if(print==1){
			  System.out.println(head.value);
			  }
			  printLeftBoundary(head.left,1);
			  }
			  if(head.right !=null){
				  printLeftBoundary(head.right,0);
			  }
		  }
	  }
	  
	  private void printRightBoundary(TreeNod head,int print){
		  if(head !=null){
			  if(head.right !=null){
			  printRightBoundary(head.right,1);
			  if(print==1){
			  System.out.println(head.value);
			  }
			  }
			  if(head.left !=null){
				  printRightBoundary(head.left,0);
			  }
		  }
	  }
	  private void printLeaf(TreeNod head){
		  if(head != null){
			  printLeaf(head.left);
			  if(head.left == null && head.right == null){
				  System.out.println(head.value);
			  }
			  printLeaf(head.right);
		  }
	  }
	  
	  public void boundary(TreeNod head){
		  if(head != null){
		  System.out.println(head.value);
		  printLeftBoundary(head.left,1);
		  printLeaf(head.left);
		  printLeaf(head.right);
		  printRightBoundary(head.right,1);
		  }
	  }
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		BoundaryTraversalBinarytree tree = new BoundaryTraversalBinarytree();
        tree.root = new TreeNod(1);
        tree.root.left = new TreeNod(2);
        tree.root.right = new TreeNod(3);
        tree.root.left.right = new TreeNod(5);
        tree.root.left.left = new TreeNod(4);
        tree.root.right.left = new TreeNod(6);
        tree.root.right.right = new TreeNod(7);
        tree.root.left.right.left = new TreeNod(8);
        tree.root.left.right.right = new TreeNod(9);
        tree.boundary(tree.root);
	}

}

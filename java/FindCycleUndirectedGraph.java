package linkedList;

class Graph{
	int V,E;
	Edge edge[];
	class Edge{
		  int src,dest;	
		};
	Graph(int v,int e){
		V=v;
		E=e;
		edge = new Edge[E];
		for(int i=0;i<E;i++){
			edge[i] = new Edge(); 
		}
	}
	public int find(int parent[],int i){
		if(parent[i]==-1){
			return 1;
		}
		return find(parent,parent[i]);
	}
	public void union(int parent[],int x,int y){
		int xset = find(parent,x);
		int yset = find(parent,y);
		parent[xset]=yset;
	}
	public int iscyclic(Graph g){
		int[] parent = new int[g.V];
		for(int i=0;i<g.V;i++){
			parent[i]=-1;
		}
		for(int i=0;i<g.E;i++){
			int x = g.find(parent,g.edge[i].src);
			int y = g.find(parent,g.edge[i].dest);
			
			if(x==y){
				return 1;
			}
			g.union(parent, x, y);
		}
		return 0;
	}
}
public class FindCycleUndirectedGraph {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Graph g = new Graph(3,3);
		g.edge[0].src = 0;
		g.edge[0].dest = 1;
		
		
		if(g.iscyclic(g)==1){
			System.out.print("cyclic graph");
		}else{
			System.out.print("do not contain any cycle");
		}
	}

}

package linkedList;

import java.util.Arrays;

class Graphs{
	int V,E;
	Edge edge[];
	class Edge implements Comparable<Edge>{
		int src,dest,weight;
		 public int compareTo(Edge compareEdge)
	        {
	            return this.weight-compareEdge.weight;
	        }
	};
	Graphs(int v,int e){
	 V=v;
	 E=e;
	edge = new Edge[E];
	for(int i=0;i<E;i++){
		edge[i]= new Edge();
	}
	}
	
	class Subset{
		int parent,rank;
	}
	public int find(Subset sub[],int x){
		if(sub[x].parent != x){
			sub[x].parent = find(sub,sub[x].parent);
		}
		return sub[x].parent;
	}
	public void union(Subset sub[],int x,int y){
		int xset = find(sub,x);
		int yset = find(sub,y);
		if(sub[xset].rank>sub[yset].rank){
			sub[yset].parent = xset;
		}else{
			sub[xset].parent = yset;
		}
		if(sub[xset].rank==sub[yset].rank){
			sub[xset].parent = yset;
			sub[yset].rank++;
		}
	}
	void kruskals(){
	    Edge result[] = new Edge[V];
	    int e=0;
	    int i=0;
	    for(i=0;i<V;i++){
	    	result[i]=new Edge();
	    }
	    Arrays.sort(edge);
	    Subset sub[] = new Subset[V];
	    for(i=0;i<V;i++){
	    	sub[i]=new Subset();
	    }
	    
	    for(i=0;i<V;i++){
	    	sub[i].parent = i;
	    	sub[i].rank = 0;
	    }
	    i=0;
	    for(e=0;e<V-1;e++){
	    	Edge nextedge = new Edge();
	    	nextedge = edge[i];
	    	i++;
	    	int x = find(sub,nextedge.src);
	    	int y = find(sub,nextedge.dest);
	    	if(x!=y){
	    		result[e++]=nextedge;
	    		union(sub,x,y);
	    	}
	    }
	    // print the contents of result[] to display the built MST
        System.out.println("Following are the edges in the constructed MST");
        for (i = 0; i < e; ++i)
            System.out.println(result[i].src+" -- "+result[i].dest+" == "+
                               result[i].weight);
	}
}
public class KruskalsAlgorithm {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int V = 4;  // Number of vertices in graph
        int E = 5;  // Number of edges in graph
        Graphs graph = new Graphs(V, E);
 
        // add edge 0-1
        graph.edge[0].src = 0;
        graph.edge[0].dest = 1;
        graph.edge[0].weight = 10;
 
        // add edge 0-2
        graph.edge[1].src = 0;
        graph.edge[1].dest = 2;
        graph.edge[1].weight = 6;
 
        // add edge 0-3
        graph.edge[2].src = 0;
        graph.edge[2].dest = 3;
        graph.edge[2].weight = 5;
 
        // add edge 1-3
        graph.edge[3].src = 1;
        graph.edge[3].dest = 3;
        graph.edge[3].weight = 15;
 
        // add edge 2-3
        graph.edge[4].src = 2;
        graph.edge[4].dest = 3;
        graph.edge[4].weight = 4;
 
        graph.kruskals();

	}

}

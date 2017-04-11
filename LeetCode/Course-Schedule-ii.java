public class Solution {
    class Graph{
	private int V;
	private LinkedList<Integer> adj[];
	private boolean isDag;
    Graph(int v){
		V = v;
		isDag = true;
		adj = new LinkedList[v];
		for(int i=0;i<v;i++){
			adj[i] = new LinkedList();
		}
    }
   public void addEdge(int m,int n){
       //System.out.println(m+"-->"+n);
	   adj[m].add(n);
   }
   
   public void topologicalSortUtil(int n,Stack stack,int visited[]){
	   if(visited[n]==1){
	       System.out.println("not dag");
		   isDag = false;
		   return;
	   }
	   if(visited[n]==2){
		   return;
	   }
	   visited[n]=1;
	   
	   Iterator<Integer> i = adj[n].listIterator();
	   while(i.hasNext()){
		   int p = i.next();
		   //if(visited[p]==0){
		   topologicalSortUtil(p,stack,visited);
		   if (isDag == false){
		       System.out.println("1");
                    return;
                }
		   //}
	   }
	   stack.push(new Integer(n));
	   visited[n]=2;
   }
   
   public void topologicalSort(int res[]){
       //int[] res = new int[V];
	   Stack<Integer> stack = new Stack<Integer>();
	   int visited[] = new int[V];
            
	   for (int j = 0; j < V; j++){
            if (visited[j] == 0){
	          topologicalSortUtil(j,stack,visited);
            }
	   }
	   int i=0;
	   
	   while(stack.empty()==false){
		   res[i]= stack.pop();
		   //System.out.println(stack.pop());
		   i++;
	   }
	   //return res;
   }
}
    public int[] findOrder(int numCourses, int[][] prerequisites) {
		
		int len = prerequisites.length;
		int[] res = new int[numCourses];
		if(len==0){
			for(int i=0;i<numCourses;i++){
				res[i]=i;
			}
			return res;
		}
        
        Graph g = new Graph(numCourses);
        /*if(prerequisites.length==1){
            res[0]=prerequisites[0][0];
            res[1]=prerequisites[0][1];
            return res;
        }*/
        for(int i=0;i<prerequisites.length;i++){
           g.addEdge(prerequisites[i][1],prerequisites[i][0]);
           //System.out.println(prerequisites[i][0]+"-->"+prerequisites[i][1]);
        }
        //System.out.println("g.isDag-->"+g.isDag);
        
        g.topologicalSort(res);
        
		if(g.isDag){
		return res;
		}else{
			return new int[]{};
		}
    }
}
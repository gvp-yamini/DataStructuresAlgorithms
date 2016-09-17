package linkedList;

import java.util.*;
import java.io.*;

public class topologicalSort {
  
	private int V;
	private LinkedList<Integer> adj[];
	
	topologicalSort(int v){
		V=v;
		adj = new LinkedList[v];
		for(int i=0;i<v;i++){
			adj[i]=new LinkedList();
		}
	}
	
	public void toposort(){
		Stack stk = new Stack();
		Boolean visited[] = new Boolean[V];
		for(int i=0;i<V;i++){
			visited[i]=false;
		}
		for(int i=0;i<V;i++){
			if (visited[i] == false)
			      topoUtil(i,visited,stk);
		}
		while(!stk.isEmpty()){
			System.out.print(stk.pop()+" ");
		}
	}
	public void topoUtil(int v,Boolean visited[],Stack stk){
		visited[v]=true;
		Integer i;
		Iterator<Integer> it = adj[v].iterator();
		while(it.hasNext()){
			i = it.next();
		    if(!visited[i]){
		    	topoUtil(i,visited,stk);
		    }
		}
		stk.push(new Integer(v));
	}
	public void addEdge(int source,int destination){
		adj[source].add(destination);
	}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		topologicalSort tp = new topologicalSort(6);
		tp.addEdge(5,0);
		tp.addEdge(5,2);
		tp.addEdge(2,3);
		tp.addEdge(3,1);
		tp.addEdge(4,0);
		tp.addEdge(4,1);
		tp.toposort();
	}

}

#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "stdlib.h"

#define MAX 100
#define initial 1
#define waiting 2
#define terminal 3

int n;
int adj[MAX][MAX];
int state[MAX];

void create_graph(){
	int edgeMax = n*(n-1);
	int origin,destination,count;
	for(count=1;count<=edgeMax;count++){
		printf("Enter edge %d( -1 -1 to quit ) : ",count);
		scanf("%d %d",&origin,&destination);
		if(origin==-1 && destination==-1){
			break;
		}else if(((origin<-1)&&(destination<-1)) || ((origin>n)&&(destination>n))){
			printf("invalid edge\n");
			count--;
		}else{
		adj[origin][destination]=1;
		}
	}
}
void dfs(int v){
	int i;
	state[v]=waiting;
	for(i=0;i<n;i++){
		if(adj[v][i]==1 && state[i]==initial){
			dfs(i);
		}
		if(state[i]!=terminal){
			printf("%d-->",i);
		}
		state[i]=terminal;
	}
}
void DFS_traversal(){
	int i,v;
	for(i=0;i<n;i++){
		state[i]= initial;
	}
	printf("enter start vertix index\n");
	scanf("%d",&v);
	dfs(v);
}
void main(){
	printf("enter number of vertices");
	scanf("%d",&n);
	create_graph();
	DFS_traversal();
	getch();
}
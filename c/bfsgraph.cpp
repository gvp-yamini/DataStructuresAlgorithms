#include "stdafx.h"
#include "stdlib.h"
#include "stdio.h"
#include "conio.h"

#define MAX 100
#define initial 1
#define waiting 2
#define terminal 3

int n;
int adj[MAX][MAX];
int state[MAX];
int queue[MAX];
int front = -1,rare = -1;

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
void enqueue(int v){
	if(rare==MAX-1){
		printf("queue is full");
	}
	if(front==-1){
		front=0;
	}
	rare++;
	queue[rare]=v;
}
int dequeue(){
	int temp;
	if(front==-1 || front>rare){
		printf("queue is empty");
		exit(1);
	}
	temp = state[front];
	front++;
	return temp;
}
bool is_empty(){
	if(front==-1 || front>rare){
		return true;
	}
	return false;
}
void bfs(int v){
	int i;
	state[v]= waiting;
	enqueue(v);
	while(!is_empty()){
	      v=dequeue();
	      state[v]= terminal;
	      printf("%d",v);
	for(i=0;i<n;i++){
		if(adj[v][i]==1 && state[i]==initial){
              enqueue(i);
			  state[i] = waiting;
		}
	  }
	}
}
void BFS_traversal(){
	int i,v;
	for(i=0;i<n;i++){
		state[i]= initial;
	}
	printf("enter start vertix index\n");
	scanf("%d",&v);
	bfs(v);
}
void main(){
	printf("enter number of vertices");
	scanf("%d",&n);
	create_graph();
	BFS_traversal();
	getch();
}
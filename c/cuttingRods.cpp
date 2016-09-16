#include "stdafx.h"
#include "stdio.h"
#include "stdlib.h"
#include "conio.h"

int max(int a,int b){
	if(a>b){
		return a;
	}
	return b;
}
int cutRod(int *prices,int n){
	int i,j,val[9],q;
	if(n==0){
		return 0;
	}
	val[0]=0;
  for(i=1;i<=n;i++){
	  q = INT_MIN;
	  for(j=0;j<i;j++){
		  q = max(q,prices[j]+val[i-j-1]);
	  }
     val[i]=q;
  }
  return val[n];
}
void main(){
	int prices[] = {1,5,8,9,10,17,17,20};
	int size = sizeof(prices)/sizeof(prices[0]);
	printf("Maximum prices: %d",cutRod(prices,size));
	getch();
}
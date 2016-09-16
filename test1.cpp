#include "stdafx.h"
#include <stdio.h>
#include "stdlib.h"

int main()
{
  int T,j;
  long long int *N,**Height,i,left,right;
  scanf("%d",&T);
  Height = (long long int **)malloc(sizeof(long long int *)*T);
  N = (long long int *)malloc(sizeof(long long int)*T);
  for(j=0;j<T;j++){
  	scanf("%lld",&N[j]);
  	Height[i] = (long long int *)malloc(sizeof(long long int )*N);
  	for(i=0;i<N[j];i++){
  	  scanf("%lld",&Height[j][i]);
  	}
  }
  for(j=0;j<T;j++){
  	left = -1;
  	right = -1;
  	for(i=0;i<N[j];i++){
  		if(Height[j][i]>Height[j][i+1]){
  			if(left==-1){
  				left = i;
  			}
  		}else if(Height[j][i]<Height[j][i+1] && left!=-1){
  			right = i;
  		}
  	}
  	if(right==-1){
  		printf("-1 -1\n");
  	}else{
  		printf("%lld %lld\n",left,right);
  	}
  }
}
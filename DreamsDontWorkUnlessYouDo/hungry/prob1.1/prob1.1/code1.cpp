#include "stdafx.h"
#include <stdio.h>
#include "stdlib.h"

int main()
{
    int T;
    long long int **arr,i,num,count=0,j,n;
    scanf("%d\n",&T);
    arr = (long long int **)malloc(T*sizeof(long long int *));
    for(j=0;j<T;j++){
    arr[j]=(long long int *)malloc(2*sizeof(long long int));
    scanf("%lld %lld",&arr[j][0],&arr[j][1]);
    }
    for(j=0;j<T;j++){
    count=0;
    for(i=arr[j][0];i<=arr[j][1];i++){
    	num = i;
    	while(num>0){
    		n = num%10;
    		if(n!=4 && n!=7){
    			break;
    		}
    		num = num/10;
    	}
    	if(num==0){
    	count = count+1;
    	}
    }
    printf("%lld\n",count);
    }
    return 0;
}
#include "stdafx.h"
#include <stdio.h>
#include "stdlib.h"
#include "conio.h"
int main()
{
    long int T,M,i,**arr,N,K,sum,j;
    scanf("%ld",&T);
    arr=(long int **)malloc(T*sizeof(long int *));
    for(i=0;i<T;i++){
    	arr[i]=(long int *)malloc(3*sizeof(long int ));
    	scanf("%ld %ld %ld",&arr[i][0],&arr[i][1],&arr[i][2]);
    }
       for(i=0;i<T;i++){
        sum=0;
    	for(j=1;j<=arr[i][0];j++){
    		sum = sum + arr[i][1]*j*j*j;
    	}
    	printf("%lld\n",sum-arr[i][2]);
    }
	getch();
    return 0;
}
#include "stdafx.h"
#include <stdio.h>
#include "stdlib.h"
#include "conio.h"

void findGCDRange(long long int ,long long int ,long long int *);
long long int find(long long int );
typedef struct input{
	char opp;
	int start;
	int end;
}INP;
int main()
{
	INP *rangearray;
    long long int N,i,*arr,numberofOperations;
    scanf("%lld",&N);
    arr = (long long int *)malloc(sizeof(long long int )*N);
    for(i=0;i<N;i++){
    	scanf("%lld",&arr[i]);
    }
    scanf("%lld",&numberofOperations);
	rangearray = (INP *)malloc(sizeof(INP)*numberofOperations);
    for(i=0;i<numberofOperations;i++){
		rangearray[i].opp = 'C';
    	scanf("%lld %lld",&rangearray[i].start,&rangearray[i].end);
    }
    for(i=0;i<numberofOperations;i++){
    	if(rangearray[i].opp=='C'){
    		findGCDRange(rangearray[i].start,rangearray[i].end,arr);
    	}else if(rangearray[i].opp=='U'){
    		arr[rangearray[i].start-1] = rangearray[i].end;
    	}else{
    		printf("invalid operation\n");
    	}
    }
	getch();
	return 0;
}

void findGCDRange(long long int start,long long int end,long long int *arr){
	long long int i,sumGCD=0,result;
	for(i=start-1;i<end-1;i++){
		sumGCD = sumGCD + find(i);
	}
	result = sumGCD%(10*10*10*10*10*10*10*10*10 + 7);
	printf("%lld\n",result);
}

long long int find(long long int num){
	long long int i=1,num1,num2,gcd=0;
	for(i=1;i<=num;i++){
		num1 = i;
		num2 = num;
		while(num1!=num2)
        {
        if(num1>num2)
            num1-=num2;
        else
            num2-=num1;
        }
      gcd = gcd + num1;  
	}
	return gcd;
}
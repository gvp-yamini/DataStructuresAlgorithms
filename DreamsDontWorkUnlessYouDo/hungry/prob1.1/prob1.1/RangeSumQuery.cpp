#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"
int sumRange(int *,int ,int );
void main(){
	int arr[7] = {-2,0,3,-5,2,1};
	int rangesum = 0,i=0,j=3;
	rangesum = sumRange(arr,i,j);
	printf("sum is: %d",rangesum);
	getch();
}
int sumRange(int *arr,int i,int j){
	int *dp;
	dp = (int *)malloc(sizeof(int));
}
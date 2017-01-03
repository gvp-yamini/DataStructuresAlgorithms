#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
int singleNumber(int *,int );
void main(){
	int temp;
	int arr[12] = {1,2,3,1,2,3,1,5,2,3};
	temp = singleNumber(arr,10);
	printf("%d",temp);
	getch();
}
int singleNumber(int *arr,int len){
int i,j,mask =1,num=0,count;
for(i=0;i<32;i++){
	count=0;
	for(j=0;j<len;j++){
		if(arr[j]&mask){
		  count++;
		}
	}
	if(count%3){
	  num = num | mask;
	}
	mask = mask<<1;
}
return num;
}
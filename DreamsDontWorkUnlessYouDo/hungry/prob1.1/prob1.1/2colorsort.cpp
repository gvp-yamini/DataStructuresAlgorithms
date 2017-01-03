#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
void twoColorsort(int *,int );
void main(){
	int arr[30],size,i;
	printf("enter size of array\n");
	scanf("%d",&size);
	printf("enter array elements\n");
	for(i=0;i<size;i++){
		scanf("%d",&arr[i]);
	}
	twoColorsort(arr,size);
	printf("sorted array is:\n");
		for(i=0;i<size;i++){
		printf("%d",arr[i]);
	}
	getch();
}
void twoColorsort(int *arr,int size){
	int i=0,j=size-1,temp=0;
	while(i<j){
		if(arr[i]==0){
			i++;
		}else if(arr[j]==1){
			j--;
		}else if(arr[i]==1 && arr[j]==0){
			temp = arr[i];
			arr[i]=arr[j];
			arr[j]=temp;
			i++;
			j--;
		}
	}
}
#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
void threeColorsort(int *,int );
void main(){
	int arr[30],size,i;
	printf("enter size of array\n");
	scanf("%d",&size);
	printf("enter array elements\n");
	for(i=0;i<size;i++){
		scanf("%d",&arr[i]);
	}
	threeColorsort(arr,size);
	printf("sorted array is:\n");
		for(i=0;i<size;i++){
		printf("%d",arr[i]);
	}
	getch();
}
void threeColorsort(int* nums,int numsSize){
	int i=0,mid=0,j=numsSize-1,temp=0;
	while(mid<=j){
		if(nums[mid]==1){
			mid++;
		}else if(nums[mid]==0){
			temp=nums[i];
			nums[i]=nums[mid];
			nums[mid] = temp;
			i++;
			mid++;
		}else if(nums[mid]==2){
			temp=nums[j];
			nums[j]=nums[mid];
			nums[mid] = temp;
			j--;
		}
	}
}
#include "stdafx.h"
#include "stdio.h"
#include "stdlib.h"
#include "conio.h"
int binarySearch(int *,int ,int,int );
void main(){
	int arr[10] = {1,2,3,4,5,6,7,8,9};
	printf("%d",binarySearch(arr,0,9,13));
	getch();
}
int binarySearch(int *arr,int low,int high,int element){
	if(low<high){
	int mid = low + (high-low)/2;
	if(arr[mid]==element){
		return mid;
	}else if(arr[mid]>element){
      binarySearch(arr,low,mid-1,element);
	}else if(arr[mid]<element){
      binarySearch(arr,mid+1,high,element);
	}
	}else{
		return 11;
	}
}
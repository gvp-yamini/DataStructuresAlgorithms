#include "stdafx.h"
#include "conio.h"
#include "stdio.h"

int min(int a,int b){
	if(a>b){
		return b;
	}
	return a;
}

void swap(int &a,int &b){
	int temp = a;
	a = b;
	b = temp;
}

void updateindex(int *index,int one,int oneposition,int two,int twoposition){
	index[one] = twoposition;
	index[two] = oneposition;
}

int minSwapsUtil(int *arr,int *pairs,int *index,int i,int n){
	if(i>n){
		return 0;
	}
	if(arr[i]==pairs[arr[i+1]]){
		return minSwapsUtil(arr,pairs,index,i+2,n);
	}
	int one = arr[i+1];
	int oneposition = i+1;
	int two = arr[index[pairs[arr[i]]]];
	int twoposition = index[pairs[arr[i]]];
	swap(arr[i+1],arr[twoposition]);
	updateindex(index,one,oneposition,two,twoposition);
	int a = minSwapsUtil(arr,pairs,index,i+2,n);
	swap(arr[i+1],arr[twoposition]);
	updateindex(index,one,oneposition,two,twoposition);

     one = arr[i];
	 oneposition = i;
	 two = arr[index[pairs[arr[i+1]]]];
	 twoposition = index[pairs[arr[i+1]]];
	swap(arr[i],arr[twoposition]);
	updateindex(index,one,oneposition,two,twoposition);
	int b = minSwapsUtil(arr,pairs,index,i+2,n);

	swap(arr[i],arr[twoposition]);
	updateindex(index,one,oneposition,two,twoposition);

	return 1 + min(a,b);
}
int minSwaps(int *arr,int *pairs,int n){
	int index[7],i;
	for(i=0;i<7;i++){
		index[arr[i]]=i;
	}
	return minSwapsUtil(arr,pairs,index,1,2*n);
}
void main(){
	int arr[] = {0,3,5,6,4,1,2};
	int pairs[] = {0,3,6,1,5,4,2};
	int m = sizeof(arr)/sizeof(arr[0]);
	int n = m/2;
	printf("%d",minSwaps(arr,pairs,n));
	getch();
}
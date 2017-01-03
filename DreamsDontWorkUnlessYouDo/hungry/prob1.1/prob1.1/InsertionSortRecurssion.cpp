#include "stdafx.h"
#include "stdio.h"
#include "conio.h"

void main(){
	int arr[8] = {5,2,8,1,0,6,7};
	int i,j,key;
	for(j=1;j<7;j++){
		key = arr[j];
		for(i=0;i<j;i++){
			if(arr[i]>key){
				arr[i]=arr[i+1];
			}
		}
		arr[i+1]=key;
	}
    for(i=0;i<7;i++){
		printf("%d",arr[i]);
	}
	getch();
}
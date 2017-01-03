#include "stdafx.h"
#include "stdio.h"
#include "conio.h"

void main(){
	char arr[7] = {5,2,4,6,1,3};
	int i,j,temp;
	for(i=0;i<6;i++){
		for(j=0;j<6-i-1;j++){
			if(arr[j]>arr[j+1]){
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}
	for(i=0;i<6;i++){
		printf("%d",arr[i]);
	}
	getch();
}
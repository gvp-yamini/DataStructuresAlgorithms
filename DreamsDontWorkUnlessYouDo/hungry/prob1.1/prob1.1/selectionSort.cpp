#include "stdafx.h"
#include "stdio.h"
#include "conio.h"

void main(){
	char arr[7] = {5,2,4,6,1,3};
	int i,j,temp;
	for(i=0;i<6-1;i++){
		for(j=i+1;j<6;j++){
			if(arr[i]>arr[j]){
				temp = arr[j];
				arr[j] = arr[i];
				arr[i] = temp;
			}
		}
	}
	for(i=0;i<6;i++){
		printf("%d",arr[i]);
	}
	getch();
}
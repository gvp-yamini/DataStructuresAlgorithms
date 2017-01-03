#include "stdafx.h"
#include "stdio.h"
#include "conio.h"

void main(){
	char arr[7] = {5,2,4,6,1,3};
	int i,j,key;
	for(j=1;j<6;j++){
		key = arr[j];
		i = j-1;
		while(i>=0 && arr[i]<key){
			arr[i+1]=arr[i];
			i=i-1;
		}
		arr[i+1]=key;
	}
	for(i=0;i<6;i++){
		printf("%d",arr[i]);
	}
	getch();
}
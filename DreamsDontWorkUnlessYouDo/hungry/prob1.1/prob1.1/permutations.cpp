#include "stdafx.h"
#include "stdio.h"
#include "stdlib.h"
#include "conio.h"
void permute(char *arr,int ,int );
void swap(char *,char *);
void main(){
	char arr[] = "ABC";
	 permute(arr, 0, 2);
	getch();
}
void swap(char *a,char *b){
	int tmp = *a;
	*a = *b;
	*b = tmp;
}
void permute(char *a,int k,int n){
	int j;
	if(k==n){
		printf("%s\n",a);
	}else{
		for(j=k;j<=n;j++){
		  swap(&a[k], &a[j]);          
          permute(a, k+1, n);
          swap(&a[k], &a[j]);
		}
	}
}
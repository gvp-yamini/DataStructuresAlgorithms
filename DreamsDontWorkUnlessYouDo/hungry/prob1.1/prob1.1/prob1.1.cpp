// prob1.1.cpp : Defines the entry point for the console application.

//Implement an algorithm to determine if a string has all unique characters. What if you can not use additional data structures?

#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

int isUniqueString(char *,int );

int _tmain(int argc, _TCHAR* argv[])
{
	int len,j,i=0;
	char *arr;
	printf("enter number of characters of a string\n");
	scanf_s("%d",&len);
	arr = (char *)malloc((len+1)*sizeof(char ));
	printf("enter string\n");
	for(i=0;i<len;i++)
	{
		arr[i]=getc(stdin);
	}
	arr[len]='\0';
	printf("inserted string is");
	for(i=0;i<len;i++){
		printf("%c",arr[i]);
	}
	printf("\n");
	if(isUniqueString(arr,len))
	{
		printf("unique string");
	}else{
		printf("contains duplicates");
	}
	getch();
	return 0;
	
}

int isUniqueString(char *arr,int len){
	int i,j;
	for(i=0;i<len;i++){
		for(j=i+1;j<len;j++){
			if(arr[i]==arr[j])
			{
				return 0;
				break;
			}
		}
	}
	return 1;
}

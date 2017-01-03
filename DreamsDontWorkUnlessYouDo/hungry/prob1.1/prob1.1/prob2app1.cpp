// prob1.1.cpp : Defines the entry point for the console application.

//Implement an algorithm to determine if a string has all unique characters. What if you can not use additional data structures?

#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

char * reversingString(char *);

int _tmain(int argc, _TCHAR* argv[])
{
	int len,i=0;
	char *arr,c;
	printf("enter number of characters of a string\n");
	scanf_s("%d",&len);
	arr = (char *)malloc((len+1)*sizeof(char ));
	printf("enter string\n");
	c=getc(stdin);
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
	arr = reversingString(arr);
	printf("reversed string is");
	for(i=0;i<len;i++){
		printf("%c",arr[i]);
	}
	getch();
	return 0;
	
}

char * reversingString(char *arr){
	char *p,*q,temp,*r;
	p = arr;
	r=arr;
	while(*arr!='\0'){
		arr++;
	}
	q=--arr;
    while(p<q){
		temp = *p;
		*p = *q;
		*q = temp;
		p++;
		q--;
	}

	return r;
}
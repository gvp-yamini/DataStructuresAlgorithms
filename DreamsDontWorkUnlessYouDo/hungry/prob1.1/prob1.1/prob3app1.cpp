// prob1.1.cpp : Defines the entry point for the console application.

//Implement an algorithm to determine if a string has all unique characters. What if you can not use additional data structures?

#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

char * removingDupicates(char *,int );
void printString(char *,int );

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
	arr = removingDupicates(arr,len);
	printf("after removing duplicates in string");
	printString(arr,len);
	getch();
	return 0;
	
}

void printString(char *arr,int len){
	int i=0;
	while(arr[i]!='\0'){
		printf("%c",arr[i]);
		i++;
	}
}

char * removingDupicates(char *arr,int len){
	int i,j,skip=0;
	char flagValiable = arr[0];
	int flag=1;
	for(i=0;i<len;i++){
		for(j=i+1;j<len;j++){
			if(*(arr+i)==*(arr+j)){
				*(arr+j) = flagValiable;
			}
		}
	}
	printf("after reading");
	printString(arr,len);
	i=1;j=0;
	while(*(arr+i)!='\0'){
		if(*(arr+i)==flagValiable){
			if(flag)
			{
			  j=i;
			  flag=0;
			}
			i++;
			while(*(arr+i)!='\0'){
				if(*(arr+i)==flagValiable)
				{
					i++;
				}else{
					*(arr+j)=*(arr+i);
					j++;
					break;
				}
			}
		}
		i++;
	}
	*(arr+j)='\0';
	return arr;
}
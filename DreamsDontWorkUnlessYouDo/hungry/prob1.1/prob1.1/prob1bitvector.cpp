// prob1.1.cpp : Defines the entry point for the console application.

//Implement an algorithm to determine if a string has all unique characters. What if you can not use additional data structures?

#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

int isUniqueStringbitVector(char *,int );

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
	if(isUniqueStringbitVector(arr,len))
	{
		printf("unique string");
	}else{
		printf("contains duplicates");
	}
	getch();
	return 0;
	
}

int isUniqueStringbitVector(char *arr,int len){
int val,i,bitvector = 0;
for(i=0;i<len;i++)
 {
  val = arr[i]-'a';
  if((bitvector & (1<<val))>0)
  {
	  return 0;
	  break;
  }else{
  bitvector = bitvector | (1<<val);
  }
 }
return 1;
}
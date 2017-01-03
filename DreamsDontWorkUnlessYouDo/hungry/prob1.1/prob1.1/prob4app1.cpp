// prob1.1.cpp : Defines the entry point for the console application.

//Write a method to decide if two strings are anagrams or not.

#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

void printString(char *);
int checkAnagrams(char *,char *,int ,int );
void sorting(char *,int ,int );
int compareStrings(char *,char *);
int _tmain(int argc, _TCHAR* argv[])
{
	int len,len2,i=0;
	char *arr1,*arr2,c;
	printf("enter number of characters of a string1\n");
	scanf_s("%d",&len);
	arr1 = (char *)malloc((len+1)*sizeof(char ));
	printf("enter string1\n");
	c=getc(stdin);
	for(i=0;i<len;i++)
	{
		arr1[i]=getc(stdin);
	}
	arr1[len]='\0';
	printf("inserted string1 is");
	printString(arr1);
	printf("enter number of characters of a string2\n");
	scanf_s("%d",&len2);
	arr2=(char *)malloc((len2+1)*sizeof(char ));
	printf("enter string2\n");
	c=getc(stdin);
	for(i=0;i<len2;i++)
	{
		arr2[i]=getc(stdin);
	}
	arr2[len2]='\0';
	printf("inserted string2 is");
	printString(arr2);
	if(checkAnagrams(arr1,arr2,len,len2)){
		printf("anagrams");
	}else{
		printf("not anagrams");
	}
	getch();
	return 0;
	
}

void printString(char *arr){
	int i=0;
	while(*(arr+i)!='\0'){
      printf("%c",*(arr+i));
	  i++;
	}
	printf("\n");
}

int checkAnagrams(char *arr1,char *arr2,int len1,int len2){
    char *bitmap1,*bitmap2;
	sorting(arr1,0,len1);
	sorting(arr2,0,len2);
	if(compareStrings(bitmap1,bitmap2))
	{
		return 1;
	}else{
		return 0;
	}
}

void sorting(char *arr,int left,int right){
	int pivot,i,j;
	char temp;
	if(left<right)
	{
		pivot = left;
	    i=left;
	    j=right;
	while(i<j){
		while((arr[i]<=arr[pivot])&&(i<right))
			i++;
		while((arr[pivot]<arr[j])&&(j>left))
			j--;
		if(i<j)
		{
			temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
	}
	temp = arr[pivot];
	arr[pivot]=arr[j];
	arr[j] = temp;
	sorting(arr,left,j-1);
	sorting(arr,j+1,right);
	}
}

int compareStrings(char *arr1,char *arr2){
	int i=0;
	while(arr1[i]!='\0' && arr2[i]!='\0'){
		if(arr1[i]!=arr2[i]){
			return 0;
			break;
		}
	}
	return 1;
}
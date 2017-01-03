
//Write a method to replace all spaces in a string with ‘%20’.

#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"
void printString(char *);
int countNoOfSpaces(char *);

int _tmain(int argc, _TCHAR* argv[])
{
	int len,i,j,noOfSpaces,newlength;
	char *arr1,c,*newstringPointer;
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
	noOfSpaces = countNoOfSpaces(arr1);
	newlength = len+(noOfSpaces*2);
	newstringPointer = (char *)malloc(newlength*sizeof(char ));
	for(i=0,j=0;i<len;i++)
	{
		if(arr1[i]!=' ')
		{
			newstringPointer[j]= arr1[i];
			j++;
		}else{
			newstringPointer[j] = '%';
			newstringPointer[j+1]='2';
			newstringPointer[j+2]='0';
			j=j+3;
		}
	}
	newstringPointer[j]='\0';
	printString(newstringPointer);
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

int countNoOfSpaces(char *arr){
	int i=0,count=0;
	while(arr[i]!='\0')
	{
		if(arr[i]==' '){
			count++;
		}
		i++;
	}
	return count;
}
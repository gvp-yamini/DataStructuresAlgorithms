// expand_string.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "malloc.h"
#include "stdio.h"
#include "conio.h"
#include "string.h"
char* program(char *,int ,int );
int _tmain(int argc, _TCHAR* argv[])
{  
	int n,len;
	char *str,*str1;
	str=(char *)malloc(100*sizeof(char));
	str1=(char *)malloc(100*sizeof(char));
	printf("enter the string");
	scanf("%s",str);
	printf("enter number of times letter should be repeated");
	scanf("%d",&n);
	len=strlen(str);
    str1=program(str,n,len);
	printf("%s",str1);
	getch();
}
char* program(char *str,int m,int len)
{
int f,i,j=0;
char *str1,a;
str1=(char *)malloc((m*len)*sizeof(char));
while(*str!='\0')
{
 a=*str;
 for(i=0;i<m;i++)
 {
	 str1[j]=a;
	 j++;
 }
 str++;
}
str1[j]='\0';
return str1;
}
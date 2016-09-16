// phone.cpp : Defines the entry point for the console application.
//



#include "stdafx.h"
#include "malloc.h"
#include "stdio.h"
#include "conio.h"
#include "string.h"
int* phone(char *);
int _tmain(int argc, _TCHAR* argv[])
{  
	int len,i;
	char *str;
	int *str1;
	str=(char *)malloc(100*sizeof(char));
	str1=(int *)malloc(100*sizeof(int));
	printf("enter the string");
	scanf("%s",str);
	len=strlen(str);
	str1=phone(str);
	for(i=0;i<len;i++)
	{
		printf("%d",str1[i]);
	}
	getch();
	return 0;
}
int* phone(char *str)
{    
	int *str1,j=0;
	str1=(int *)malloc(100*sizeof(int));
	while(*str!='\0')
	{
		if(*str=='a' || *str=='b' || *str=='c' || *str=='A' || *str=='B' || *str=='C')
		{
			str1[j]=2;
			j++;
		}
		else if(*str=='d' || *str=='e' || *str=='f' || *str=='D' || *str=='E' || *str=='F')
		{
			str1[j]=3;
			j++;
		}
		else if(*str=='g' || *str=='h' || *str=='i' || *str=='G' || *str=='H' || *str=='I')
		{
			str1[j]=4;
			j++;
		}
		else if(*str=='j' || *str=='k' || *str=='l' || *str=='J' || *str=='K' || *str=='L')
		{
			str1[j]=5;
			j++;
		}
		else if(*str=='m' || *str=='n' || *str=='o' || *str=='M' || *str=='N' || *str=='O')
		{
			str1[j]=6;
			j++;
		}
		else if(*str=='p' || *str=='q' || *str=='r' || *str=='s' || *str=='P' || *str=='Q' || *str=='R' || *str=='S')
		{
			str1[j]=7;
			j++;
		}
		else if(*str=='t' || *str=='u' || *str=='v' || *str=='T' || *str=='U' || *str=='V')
		{
			str1[j]=8;
			j++;
		}
		else if(*str=='w' || *str=='x' || *str=='y' || *str=='z' || *str=='W' || *str=='X' || *str=='Y' || *str=='Z')
		{
			str1[j]=9;
			j++;
		}
		else if(*str==' ')
		{
			str1[j]=0;
			j++;
		}
		else
		{
			str1[j]=1;
			j++;
		}
		str++;
	}
	str1[j]='\0';
	return str1;
}
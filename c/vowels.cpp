// vowels.cpp : Defines the entry point for the console application.
//


#include "stdafx.h"
#include "malloc.h"
#include "stdio.h"
#include "conio.h"
int _tmain(int argc, _TCHAR* argv[])
{
	int i,count=0,n,v=0;
	char vowels[6]="aeiou";
	char *str;
	str=(char *)malloc(100*sizeof(char));
	printf("enter the string");
	scanf("%s",str);
	while(*str!='\0')
	{
		for(i=0;i<5;i++)
		{
			if(*str==vowels[i])
			{
             v++;
			}
		}
		count++;
		str++;
	}
	printf("number of vowels are %d",v);
	printf("number of consonents are %d",count-v);
	getch();
	return 0;
}
/*int vowel_count(char *str)
{
	int vowels=0;
	char vowels[]="aeiou";
	char *str1
	str1=vowels;
	while(*str!='\0')
	{
		while(*str1!='\0')
		{
			if(*str==*str1)
			{
             vowels++;
			}
			str1++;
		}
		str++;
	}
	return vowels;
}*/
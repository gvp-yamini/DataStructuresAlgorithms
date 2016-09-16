// case.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "malloc.h"
#include "stdio.h"
#include "conio.h"
#include "ctype.h"
char* change_case(char *);
int _tmain(int argc, _TCHAR* argv[])
{  
	char *str,*str1;
	str=(char *)malloc(100*sizeof(char));
    str1=(char *)malloc(100*sizeof(char));
	printf("enter the string");
	scanf("%s",str);
	str1=change_case(str);
	printf("%s",str1);
	getch();
return 0;
}
char* change_case(char *str)
{
	int temp,i=0;
	char *str1;
	str1=(char *)malloc(100*sizeof(char));
while(*str!='\0')
	{
		temp=toascii(*str);
		if(temp>=65 && temp<=90)
		{
			temp=temp+32;
		}
		else if(temp>=97 & temp<=122)
		{
			temp=temp-32;
		}
		else
		{
			printf("enter string consists of characters which are not alphabets");
		}
		str1[i]=toascii(temp);
		str++;
		i++;
	}
str1[i]='\0';
return str1;
}
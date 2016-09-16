// only_letters.cpp : Defines the entry point for the console application.
//


#include "stdafx.h"
#include "malloc.h"
#include "stdio.h"
#include "conio.h"
#include "ctype.h"
char* remove_digit(char *);
int _tmain(int argc, _TCHAR* argv[])
{  
	char *str,*str1;
	str=(char *)malloc(100*sizeof(char));
    str1=(char *)malloc(100*sizeof(char));
	printf("enter the string");
	scanf("%s",str);
	str1=remove_digit(str);
	printf("%s",str1);
	getch();
return 0;
}
char* remove_digit(char *str)
{
	int temp,i=0;
	char *str1;
	str1=(char *)malloc(100*sizeof(char));
while(*str!='\0')
	{
		temp=toascii(*str);
		if(temp>=48 && temp<=57)
		{
			str++;
		}
		else
		{
		str1[i]=toascii(temp);
		str++;
		i++;
		}
	}
str1[i]='\0';
return str1;
}

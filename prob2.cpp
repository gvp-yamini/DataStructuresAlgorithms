#include "stdafx.h"
#include "stdio.h"
#include "conio.h"

int  *sumoftwo(int *,int ,int);
int isnumber(int );
void main()
{
	int number[] = {2,7,11,15};
	int target = 18;
	int n;
	int *ptr;
	ptr=sumoftwo(number,target,n);
	printf("%d %d",ptr[0],ptr[1]);
	getch();
}

int *sumoftwo(int *number,int n,int target)
{
	int * hash = number;
	int i,p,q;
	int ptr[2];
	for(i=0;i<n;i++)
	{
		hash[target - number[i]]=i;
	}

	for(i=0;i<n;i++)
	{
		if(isnumber(hash[target-number[i]])&&isnumber(hash[number[i]]))
		{
			ptr[0]=hash[number[i]];
			ptr[1]=hash[target-number[i]];
		}
	}
	return ptr;
}

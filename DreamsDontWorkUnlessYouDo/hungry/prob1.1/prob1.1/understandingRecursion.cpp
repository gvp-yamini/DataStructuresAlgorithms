#include "stdafx.h"
#include "stdio.h"
#include "conio.h"

void recur(int );

void main(){
	recur(0);
	getch();
}

void recur(int count){
	if(count<10){
	printf("above %d\n",count);
	recur(count+1);
	printf("after statement1 %d\n",count);
	printf("after statement2 %d\n",count);
	}else{
		return;
	}
}
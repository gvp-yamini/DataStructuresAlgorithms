#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
int isPowerOfTwo(int n);
void main(){
	int flag = 0;
	flag=isPowerOfTwo(15);
	if(flag){
		printf("power of two\n");
	}else{
		printf("not\n");
	}
	getch();
}

int isPowerOfTwo(int n) {
       int i=1,num=1;
       while(num<=n){
           if(num==n){
               return 1;
           }
           num = 1 << i ;
           i++;
       }
       return 0;
  }
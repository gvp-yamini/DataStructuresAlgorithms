#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
char* convertToTitle(int );
void main(){
	char *temp,i=0;
	temp= convertToTitle(1);
	 while(temp[i]!='\0'){
		printf("%c",temp[i]);
		i++;
	}
	getch();
}

char* convertToTitle(int n) {
   char str[100],m=0,i=0;
   char hash[27] = {'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};
   hash[26] = '\0';
   while(n>0){
       m = n%26;
       str[i]=hash[m-1];
       i++;
       n=n/26;
   }
   str[i] = '\0';
   return str;
}
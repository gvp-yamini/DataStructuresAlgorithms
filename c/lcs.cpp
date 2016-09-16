#include "stdafx.h"
#include "stdio.h"
#include "stdlib.h"
#include "string.h"
#include "conio.h"
int max(int a,int b){
	if(a>b){
		return a;
	}
	return b;
}
int lcs(char *str1,char *str2,int m,int n){
	if(m==0 || n==0){
		return 0;
	}else if(str1[m-1]==str2[n-1]){
		return 1 + lcs(str1,str2,m-1,n-1);
	}else{
		return max(lcs(str1,str2,m,n-1),lcs(str1,str2,m-1,n));
	}
}
void main(){
	char *str1="AGGTAB",*str2="GXTXAYB";
	int m,n;
	m = strlen(str1);
	n = strlen(str2);
	printf("lsc length is %d",lcs(str1,str2,m,n));
	getch();
}
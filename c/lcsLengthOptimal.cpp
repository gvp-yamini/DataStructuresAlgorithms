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
	int l[6][7],i,j;
	for(i=0;i<=m;i++){
		for(j=0;j<=n;j++){
	if(i==0 || j==0){
	     l[i][j]=0;
	}else if(i>0 && j>0 &&(str1[i-1]==str2[j-1])){
		l[i][j] = 1 + l[i-1][j-1];
	}else{
		l[i][j] = max(l[i-1][j],l[i][j-1]);
	}
	}
  }
	return l[m][n];
}
void main(){
	char *str1="AGGTAB",*str2="GXTXAYB";
	int m,n;
	m = strlen(str1);
	n = strlen(str2);
	printf("lsc length is %d",lcs(str1,str2,m,n));
	getch();
}
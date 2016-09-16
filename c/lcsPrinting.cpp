#include "stdafx.h"
#include "conio.h"
#include "stdio.h"
#include "stdlib.h"
#include "string.h"
int max(int a,int b){
	if(a>b){
		return a;
	}
	return b;
}
void lcs(char *str1,char *str2,int m,int n){
	int l[7][11],i,j,len,stlen;
	char *lcsstring;
	for(i=0;i<6;i++){
		l[i][0] = 0;
	}
	for(j=0;j<10;j++){
		l[0][j]=0;
	}
	for(i=0;i<=m;i++){
		for(j=0;j<=n;j++){
			if(i==0 || j==0){
				l[i][j]=0;
			}else if(str1[i-1]==str2[j-1]){
				l[i][j] = l[i-1][j-1]+1;
			}else{
				l[i][j] = max(l[i-1][j],l[i][j-1]);
			}
		}
	}
	len = l[m][n];
	stlen = len;
	lcsstring = (char *)malloc(sizeof(char)*(len+1));
	lcsstring[len]='\0';
	len--;
	i=m,j=n;
	while(i>0 && j>0){
	if(str1[i-1]==str2[j-1]){
		lcsstring[len]= str1[i-1];
		i--;j--;len--;
	}else if(l[i-1][j]>l[i][j-1]){
		i--;
	}else{
		j--;
	}
  }
	printf("%s",lcsstring);
}
void main(){
  char str1[] = "yamini"; 
  char str2[] = "ratnathota";
  int m,n;
  m = strlen(str1);
  n = strlen(str2);
  lcs(str1,str2,m,n);
  getch();
}
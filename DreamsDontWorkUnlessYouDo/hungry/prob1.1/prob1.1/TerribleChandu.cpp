#include "stdafx.h"
#include <stdio.h>
#include "conio.h"
#include <stdlib.h>
#include <string.h>

char **reversingStrings(char **,int r);
char * reverseEachString(char **,int r);
int main(){
	int T,i,j,len;
	char **S;
	scanf("%d",&T);
	S = (char **)malloc(T*sizeof(char *));
	for(i=0;i<T;i++){
		S[i]=(char *)malloc(32*sizeof(char));
	}
	for(i=0;i<T;i++){
		gets(S[i]);
	}
	S=reversingStrings(S,T);
	for(i=0;i<T;i++){
		len = strlen(S[i]);
		for(j=0;j<len;j++){
			printf("%c",S[i][j]);
		}
		printf("\n");
	}
 return 0;
}
char ** reversingStrings(char **S,int r){
	int i;
	for(i=0;i<r;i++){
		S[i]=reverseEachString(S,i);
	}
	return S;
}

char * reverseEachString(char **S,int r){
	char temp;
	int i,j,length;
	length = strlen(S[r]);
	i=0,j=length-1;
		while(i<j){
		temp = S[r][i];
		S[r][i] = S[r][j];
		S[r][j] = temp;
		i++;
		j--;
	}
}
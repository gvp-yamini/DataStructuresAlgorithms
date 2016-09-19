#include "stdafx.h"
#include <stdio.h>
#include <string.h>
#include "conio.h"
#include "stdlib.h"

 
// This function prints the longest palindrome substring
// of str[].
// It also returns the length of the longest palindrome
void printSubStr( char* str, int low, int high )
{
    for( int i = low; i <= high; ++i )
        printf("%c", str[i]);
}

int longestPalSubstr( char *s)
{
    bool table[5][5];
	int i,j,maxlen=1,start=0,k;
    int len = strlen(s);
    char * result;
    if(s==NULL || len==1){
        return len;
    }
    memset(table,0,sizeof(table));
    for(i=0;i<len;i++){
        table[i][i]=true;
    }
    for(i=0;i<len-1;i++){
        if(s[i]==s[i+1]){
            table[i][i+1]=true;
            maxlen = 2;
            start = i;
        }
    }
    for(k=3;k<=len;i++){
        for(i=0;i<len-k+1;i++){
            j = k+i-1;
            if(table[i+1][j-1] && s[i]==s[j]){
                table[i][j]=true;
                if(maxlen<k){
                    start = i;
                    maxlen = k;
                }
            }
        }
    }
    printSubStr( s, start, start + maxlen - 1 );

    return maxlen;
}
 
// Driver program to test above functions
int main()
{
    char str[] = "tabba";
	printf("%d",longestPalSubstr(str));
	getch();
    return 0;
}
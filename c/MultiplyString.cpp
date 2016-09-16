#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "stdlib.h"
#include "string.h"

bool isVowel(char ch){
    if(ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u'){
        return true;
    }
    return false;
}
char* reverseVowels(char* s) {
    int i,j,n;
    char temp;
    n=strlen(s);
    i=0,j=n-1;
    while(i<j){
        while(!isVowel(s[i]) && i<n && i<j){
            i++;
        }
        while(!isVowel(s[j]) && j>=0){
            j++;
        }
        temp = s[i];
        s[i] = s[j];
        s[j] = temp;
    }
    return s;
}

void main(){
	char * s ="hello";
	printf("%s",reverseVowels(s));
	getch();
}
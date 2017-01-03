#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "string.h"

bool isAnagram(char* , char* );
void quicksort(char*,int ,int );
void main(){
	char *s = "abc",*t="abc";
	if(isAnagram(s,t)){
		printf("anagram\n");
	}else{
		printf("not anagram\n");
	}
	getch();
}

bool isAnagram(char* s, char* t) {
    int len1=0,len2=0,i=0;
    while(s[len1]){
        len1++;
    }
    while(t[len2]){
        len2++;
    }
    quicksort(s,len1-1,0);
    quicksort(t,len2-1,0);
    while(s[i]&&t[i]){
        if(s[i]!=t[i]){
            return false;
        }
    }
    return true;
}

void quicksort(char *arr,int max,int min){
int pivot,rightmark,leftmark;
char temp;
if(min<max){
  pivot = (max+min)/2;
  rightmark = max;
  leftmark = min;
  while(rightmark>leftmark){
   while(arr[leftmark]<=arr[pivot]&&leftmark<max){
     leftmark++;
  }
  while(arr[rightmark]>arr[pivot]){
     rightmark--;
  }
  if(leftmark<rightmark){
  temp = arr[leftmark];
  arr[leftmark] = arr[rightmark];
  arr[rightmark] = temp;
 }
}
temp = arr[pivot];
arr[pivot] = arr[rightmark];
arr[rightmark] = temp;
quicksort(arr,min,rightmark-1);
quicksort(arr,rightmark+1,max);
}
}

int quicksort(char *word, int left, int right){
 
    char *mid = word[(left+right)/2]; //point to the middle
    char temp[right+1];
    int i= left;
    int j = right;
 
    while(i <= j){
 
        //word[i] is less than mid and i<right
        while((strcmp(word[i], mid) < 0) && (i < right)){
            i++;
        }
 
        //word[i] is greater than mid and j>left
        while((strcmp(word[j],mid) > 0) && (j > left)){
            j--;
        }
 
        //swap
        if(i <= j){
            strcpy(temp, word[i]);
            strcpy(word[i], word[j]);
            strcpy(word[j], temp);
            i++;
            j--;
        }
    }
 
    if(left<j){
        quicksort(word,left,j);
    }
    if(i<right){
        quicksort(word, i,right);
    }
}
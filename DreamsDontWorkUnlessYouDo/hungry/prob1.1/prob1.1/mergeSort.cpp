#include "stdafx.h"
#include "conio.h"
#include "stdio.h"
#include "malloc.h"
void part(int *,int ,int );
void mergeSort(int *,int ,int ,int );
int singleNumber(int *,int );
int main()
{
 int arr[30];
 int i,size;
 printf("\n\t------- Merge sorting method -------\n\n");
 printf("Enter total no. of elements : ");
 scanf("%d",&size);
 for(i=0; i<size; i++)
 {
   printf("Enter %d element : ",i+1);
   scanf("%d",&arr[i]);
 }
 printf("%d\n",singleNumber(arr,size));
 getch();
 return 0;
}

int singleNumber(int* nums, int numsSize) {
 int i;
 part(nums,0,numsSize-1);
 for(i=0;i<numsSize;i++){
	 printf("%d",nums[i]);
 }
 printf("\n");
}

void part(int *nums,int min,int max){
    int mid = (min+max)/2;
    if(min<max){
       part(nums,min,mid);
       part(nums,mid+1,max);
       mergeSort(nums,min,mid,max);
    }
}

void mergeSort(int *nums,int min,int mid,int max){
    int j,i,m,*temp,k;
	temp = (int *)malloc(sizeof(int)*(max+1));
    j=min;m=mid+1;
    for(i=min;j<=mid&&m<=max;i++){
        if(nums[j]<nums[m]){
            temp[i]=nums[j];
            j++;
        }else{
            temp[i]=nums[m];
            m++;
        }
    }
   if(j>mid){
       for(k=m;k<=max;k++){
           temp[i] = nums[k];
           i++;
       }
   }else{
        for(k=j;k<=mid;k++){
           temp[i] = nums[k];
           i++;
       }
   }
   for(k=min;k<=max;k++){
       nums[k]=temp[k];
   }
}
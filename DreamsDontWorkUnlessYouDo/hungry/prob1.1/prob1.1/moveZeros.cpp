#include "stdafx.h"
#include "conio.h"
#include "stdio.h"

void moveZeroes(int *, int );
void main(){
	int a[2]={0,0};
	moveZeroes(a,2);
	getch();
}
void moveZeroes(int* nums, int numsSize) {
    int k,i=0,j=numsSize;
    while(i<j){
        if(nums[i]==0 && nums[j]!=0){
            for(k=i;k<=j;k++){
                nums[k]=nums[k+1];
            }
            nums[j]=0;
            i++,j--;
        }else if(nums[i]==0 && nums[j]==0){
            j--;
        }else if(nums[i]!=0 && nums[j]!=0){
            i++;j--;
        }else if(nums[i]!=0 && nums[j]==0){
            i++;
        }
    }
    
}
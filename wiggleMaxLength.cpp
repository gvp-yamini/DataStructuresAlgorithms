#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "stdlib.h"
int wiggleMaxLength(int* nums, int numsSize) {
    int i=0,counter=0,prevdiff,diff;
    if(numsSize<2){
        return numsSize;
    }
    prevdiff= nums[1]-nums[0];
    if(prevdiff==0){
      counter=1;  
    }else{
    counter = 2;
    }
    for(i=2;i<numsSize;i++){
		diff = nums[i]-nums[i-1];
        if((prevdiff<=0 && diff>0)||(prevdiff>=0 && diff<0)){
            counter++;
			prevdiff=diff;
        }
    }
    
     return counter;
}
void main(){
	int nums[] = {33,53,12,64,50,41,45,21,97,35,47,92,39,0,93,55,40,46,69,42,6,95,51,68,72,9,32,84,34,64,6,2,26,98,3,43,30,60,3,68,82,9,97,19,27,98,99,4,30,96,37,9,78,43,64,4,65,30,84,90,87,64,18,50,60,1,40,32,48,50,76,100,57,29,63,53,46,57,93,98,42,80,82,9,41,55,69,84,82,79,30,79,18,97,67,23,52,38,74,15};
	printf("%d",wiggleMaxLength(nums,100));
	getch();
}
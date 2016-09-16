#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "stdlib.h"
int combinationSum(int *nums,int target,int length){
	int dp[5],i,j;
	if(nums == NULL || length==0){
		return 0;
	}
	for(i=0;i<5;i++){
		dp[i]=0;
	}
	dp[0]=1;
	for(i=0;i<=target;i++){
		for(j=0;j<length;j++){
			if(i+nums[j]<=target){
				dp[i+nums[j]] = dp[i+nums[j]] + dp[i];
			}
		}
	}
	return dp[target];
}
void main(){
	int nums[] = {1,2,3};
	int length=3,target = 4;
	printf("%d",combinationSum(nums,target,length));
	getch();
}
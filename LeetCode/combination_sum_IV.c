int combinationSum4(int* nums, int numsSize, int target) {
    	int *dp,i,j;
	if(nums == NULL || numsSize==0){
		return 0;
	}
	dp = (int *)malloc(sizeof(int)*(target+1));
	for(i=0;i<(target+1);i++){
		dp[i]=0;
	}
	dp[0]=1;
	for(i=0;i<=target;i++){
		for(j=0;j<numsSize;j++){
			if(i+nums[j]<=target){
				dp[i+nums[j]] = dp[i+nums[j]] + dp[i];
			}
		}
	}
	return dp[target];
    
}
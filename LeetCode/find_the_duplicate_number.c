int findDuplicate(int* nums, int numsSize) {
    int *hash,i,maxSizeHash=0;
    for(i=0;i<numsSize;i++){
        if(maxSizeHash<nums[i]){
            maxSizeHash = nums[i];
        }
    }
    hash = (int *)malloc((maxSizeHash+1)*sizeof(int ));
    for(i=0;i<=maxSizeHash;i++){
        hash[i]=0;
    }
    for(i=0;i<numsSize;i++){
        if(hash[nums[i]]==1){
            return nums[i];
        }else{
            hash[nums[i]] = 1;
        }
    }
}
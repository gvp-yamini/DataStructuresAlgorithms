/**
 * Return an array of size *returnSize.
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* maxSlidingWindow(int* nums, int numsSize, int k, int* returnSize) {
    if(numsSize==0){
        return;
    }
    int max,i,j=0;
    returnSize = (int* )malloc((numsSize-k+1)*sizeof(int));
    max = nums[0];
    printf("%d",max);
    for(i=1;i<k;i++){
       if(max<nums[i]){
           max = nums[i];
       }
    }
    returnSize[0]=max;
    for(i=k;i<numsSize;i++){
        if(nums[i]>returnSize[j]){
            returnSize[j+1]= nums[i];
        }else{
            returnSize[j+1] = returnSize[j];
        }
        j++;
    }
    return returnSize;
}
int removeElement(int* nums, int numsSize, int val) {
    int count = 0,i;
    for(i=0;i<numsSize;i++){
        if(nums[i]==val){
            count++;
        }else{
            nums[i-count] = nums[i];
        }
    }
    return numsSize - count;
}
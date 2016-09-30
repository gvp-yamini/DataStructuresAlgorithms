bool canJump(int* nums, int numsSize) {
    int i=0,max;
    if(numsSize==0 || numsSize==1){
        return true;
    }
    max=nums[i];
    for(i=0;i<numsSize;i++){
        if(nums[i]==0 && max<=i){
              return false;
        }
        if(i + nums[i]>max){
          max = i + nums[i];
        }
    if(max>=numsSize-1){
        return true;
       }
    }
    return false;
}
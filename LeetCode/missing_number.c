int missingNumber(int* nums, int numsSize) {
    int sumofN=0,sumofGiven=0,i;
    for(i=0;i<numsSize;i++){
        sumofN = sumofN + i;
        sumofGiven = sumofGiven + nums[i];
    }
    sumofN = sumofN + i;
    return sumofN - sumofGiven;
}
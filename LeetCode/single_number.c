int singleNumber(int* nums, int numsSize) {
 int i,singleNumber=0;
 for(i=0;i<numsSize;i++){
     singleNumber = singleNumber^nums[i];
 }
 return singleNumber;
}

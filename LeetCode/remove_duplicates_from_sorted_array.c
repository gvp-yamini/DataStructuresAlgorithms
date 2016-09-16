int removeDuplicates(int* nums, int numsSize) {
int j=0,i=1;
if(numsSize==0){
    return 0;
}
while(i<numsSize){
  if(nums[j]==nums[i]){
   i++;
  }else{
  j++;
  nums[j]=nums[i];
  i++;
  }
}
return j+1;
}
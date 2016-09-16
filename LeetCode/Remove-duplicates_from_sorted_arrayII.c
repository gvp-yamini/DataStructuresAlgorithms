int removeDuplicates(int* nums, int numsSize) {
int j=0,i=1,count=0;
if(numsSize==0){
    return 0;
}
while(i<numsSize){
  if(nums[j]==nums[i]){
   i++;
   count++;
   if(count==1){
	    j++;
        nums[j]=nums[i-1];
   }
  }else{
  count=0;
  j++;
  nums[j]=nums[i];
  i++;
  }
}
 return j+1;   
}
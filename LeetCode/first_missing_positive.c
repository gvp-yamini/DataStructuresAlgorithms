int firstMissingPositive(int* nums, int numsSize) {
 int *hash,i,maxSizeOfHash=0;
 for(i=0;i<numsSize;i++){
     if(maxSizeOfHash<nums[i]){
         maxSizeOfHash = nums[i];
     }
 }
 hash = (int *)malloc((maxSizeOfHash+1)*sizeof(int));
 for(i=0;i<=maxSizeOfHash;i++){
     hash[i]=0;
 }
 hash[0]=1;
 for(i=0;i<numsSize;i++){
     if(nums[i]>0){
         hash[nums[i]]=1;
     }
 }
  for(i=0;i<=maxSizeOfHash;i++){
     if(hash[i]!=1){
         return i;
     }
 }
 return i;
}
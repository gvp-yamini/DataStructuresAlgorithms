int binarySearchHelper(int *nums,int low,int high);
int findMin(int* nums, int numsSize) {
   return binarySearchHelper(nums,0,numsSize-1); 
}

int binarySearchHelper(int *nums,int low,int high){
    if(low<high){
      int mid = low+(high-low)/2;
      if(nums[mid-1]>nums[mid] && low<mid){
          return nums[mid];
      }else if(nums[mid]>nums[mid+1] && mid<high){
          return nums[mid+1];
      }
      if(nums[high]>nums[mid]){
        return binarySearchHelper(nums,low,mid-1);  
      }
      return binarySearchHelper(nums,mid+1,high);
    }
    return nums[low];
    
}
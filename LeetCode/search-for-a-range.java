public class Solution {
    public int[] searchRange(int[] nums, int target) {
    int start=-1,end=-1;
    int left = 0;
    int right = nums.length-1;
    while(left<=right){
        int mid = left + (right-left)/2;
        if(nums[mid] == target){
        if(mid == 0 || target != nums[mid-1]){
            start = mid;
            break;
        }
        right = mid - 1;
        }else if(nums[mid]>target){
            right = mid - 1; 
        }else{
            left = mid + 1;
        }
    }
    left = 0;
    right = nums.length-1;
      while(left<=right){
        int mid = left + (right-left)/2;
        if(nums[mid]==target){
        if(mid == nums.length-1 || target != nums[mid+1]){
            end = mid;
            break;
        }
        left = mid + 1;
        }else if(nums[mid]>target){
            right = mid - 1; 
        }else{
            left = mid + 1;
        }
    }
    return new int[]{start,end};
    }
}
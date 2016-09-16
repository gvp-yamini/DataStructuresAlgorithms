public class Solution {
    public int maxSubArray(int[] nums) {
        if(nums.length==0){
            return 0;
        }
        int max_sum = finding_range(nums,0,nums.length-1);
        return max_sum;
    }
    
    public int finding_range(int[] nums,int low,int high){
        if(low==high){
            return nums[low];
        }
            int mid = (low+high)/2;
            int left_range = finding_range(nums,low,mid);
            int right_range = finding_range(nums,mid+1,high);
            int leftmax = nums[mid];
            int rightmax = nums[mid+1];
        int temp = 0;
        for(int i=mid;i>=low;i--) {
            temp += nums[i];
            if(temp > leftmax) leftmax = temp;
        }
        temp = 0;
        for(int i=mid+1;i<=high;i++) {
            temp += nums[i];
            if(temp > rightmax) rightmax = temp;
        }
        return Math.max(Math.max(left_range, right_range),leftmax+rightmax);
    }
}
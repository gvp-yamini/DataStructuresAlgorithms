public class Solution {
    public int max(int a,int b){
        if(a>b){
            return a;
        }
        return b;
    }
    public int lengthOfLIS(int[] nums) {
       int len = nums.length;
       int[] dp = new int[len];
       Arrays.fill(dp, 1);
       for(int i=1;i<len;i++){
           for(int j=0;j<i;j++){
               if(nums[j]<nums[i]){
                   dp[i]=max(dp[i],dp[j]+1);
               }
           }
       }
       int large=0;
       for(int i=0;i<len;i++){
           if(dp[i]>large){
               large = dp[i];
           }
       }
       return large;
    }
}
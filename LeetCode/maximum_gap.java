public class Solution {
    public int maximumGap(int[] nums) {
        int len = nums.length;
     if(len<2 || nums == null){
         return 0;
     }
     int max=nums[0];
     int min=nums[0];
     for(int i:nums){
            min = Math.min(min, i);
            max = Math.max(max, i);
     }
     int gap = (int)Math.ceil((double)(max-min)/(len-1));
     int[] bucketMin = new int[len-1];
     int[] bucketMax = new int[len-1];
     Arrays.fill(bucketMin,Integer.MAX_VALUE);
     Arrays.fill(bucketMax,Integer.MIN_VALUE);
     for(int i : nums){
         if(i==min || i==max){
             continue;
         }
         int index = (i-min)/gap;
         bucketMin[index] = Math.min(bucketMin[index],i);
         bucketMax[index] = Math.max(bucketMax[index],i);
     }
     int MaxGap = Integer.MIN_VALUE;
     int previous = min;
     for(int i=0;i<bucketMin.length;i++){
        if(bucketMin[i]==Integer.MAX_VALUE && bucketMax[i]==Integer.MIN_VALUE){
            continue;
        }
        MaxGap = Math.max( MaxGap,bucketMin[i]-previous);
        previous = bucketMax[i];
     }
     MaxGap = Math.max( MaxGap,max-previous);
     return MaxGap;
    }
}
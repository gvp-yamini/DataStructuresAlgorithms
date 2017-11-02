//equating all the elements to minimum
class Solution {
    public int minMoves(int[] nums) {
        int i,sum=nums[0],min=nums[0],len=nums.length;
        for(i=1;i<len;i++){
            sum = sum + nums[i];
            if(min>nums[i]){
               min = nums[i]; 
            }
        }
        return sum - len*min;
    }
}
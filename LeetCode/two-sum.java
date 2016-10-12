public class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer,Integer> hm = new HashMap<Integer,Integer>();
        int[] result = new int[2];
        int len = nums.length;
        if(len<2){
            return result;
        }
        for(int i=0;i<nums.length;i++){
            if(hm.containsKey(target-nums[i])){
                result[0]=hm.get(target-nums[i]);
                result[1]=i;
                return result;
            }
            hm.put(nums[i],i);
        }
        return result;
    }
}
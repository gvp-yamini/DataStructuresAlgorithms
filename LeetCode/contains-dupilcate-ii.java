public class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        int l = nums.length;
        HashMap<Integer,Integer> hmap = new HashMap<Integer,Integer>();
        for(int i=0;i<l;i++){
            Integer ret = hmap.put(nums[i],i);
            if(ret != null && i-ret<=k){
              return true;  
            }
        }
        return false;
    }
}
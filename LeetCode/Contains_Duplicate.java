public class Solution {
    public boolean containsDuplicate(int[] nums) {
        HashMap<Integer,Integer> hm = new HashMap<Integer,Integer>();
		int len = nums.length;
		if(len<2){
			return false;
		}
        for(int i=0;i<len;i++){
			if(hm.get(nums[i])== null){
				hm.put(nums[i],1);
			}else{
				return true;
			}
		}
       return false;		
    }
}
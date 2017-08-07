public class Solution {
    public int longestConsecutive(int[] nums) {
        HashMap temp = new HashMap();
		int max=0,curr_max=0;
		int len = nums.length;
		for(int i=0;i<len;i++){
			temp.put(nums[i],1);
		}
		for(int i=0;i<len;i++){
			if(!temp.containsKey(nums[i]-1)){
				curr_max=0;
				while(temp.containsKey(nums[i]+curr_max)){
					curr_max++;
				}
				if(curr_max>max){
					max = curr_max;
				}
			}
		}
		return max;
    }
}
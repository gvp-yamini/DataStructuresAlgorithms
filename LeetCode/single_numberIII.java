public class Solution {
    public int[] singleNumber(int[] nums) {
		int result[] = new int[2];
        HashMap<Integer, Integer> hmap = new HashMap<Integer, Integer>();
        for(int i=0;i<nums.length;i++){
           if(hmap.containsKey(nums[i])){
              hmap.put(nums[i],2);
           }else{
              hmap.put(nums[i],1);
           }
        }
		int j=0;
		for(int i=0;i<nums.length;i++){
			if(hmap.get(nums[i])==1){
				result[j]=nums[i];
				j++;
			}
		}
		return result;
    }
}
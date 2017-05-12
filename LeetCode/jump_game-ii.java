public class Solution {
	public int max(int i,int j){
		if(i>j){
			return i;
		}
		return j;
	}
    public int jump(int[] nums) {
		int n = nums.length;
		
        if(n<2){
            return 0;
        }
		
		int i=0,currMax=0,nextMax=0,level=0;
		while(currMax-i+1>0){
			level++;
			while(i<=currMax && i<n){
				nextMax = max(nextMax,nums[i]+i);
				if(nextMax>=n-1){
				    return level;
				}
				i++;
			}
			currMax = nextMax;
		}
		
		/*if(nextMax<n){
			return ;
		}*/
		
		return 0;
		
    }
}
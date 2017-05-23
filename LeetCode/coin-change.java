public class Solution {
    public int coinChange(int[] coins, int amount) {
        int len = coins.length;
		if(len==0 || coins == null || amount == 0){
		    return 0;
		}
		int[] minChange = new int[amount+1];
		for(int i=1;i<=amount;i++){
		    minChange[i]=Integer.MAX_VALUE;
		    for(int j=0;j<len;j++){
		        if(coins[j]<=i && minChange[i-coins[j]] != Integer.MAX_VALUE){
		            minChange[i] = Math.min(minChange[i],1+minChange[i-coins[j]]);
		          }
		        }
		    }
		    if(minChange[amount]==Integer.MAX_VALUE){
		        return -1;
		    }
		    return minChange[amount];
		}
    }
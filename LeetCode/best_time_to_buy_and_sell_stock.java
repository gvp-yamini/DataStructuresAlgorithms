public class Solution {
    public int maxProfit(int[] prices) {
        if(prices.length==0){
            return 0;
        }
        int profit = 0;
        int min_value = Integer.MAX_VALUE;
        for(int i =0; i< prices.length;i++){
            profit = Math.max(profit,prices[i]-min_value);
            min_value = Math.min(min_value,prices[i]);
        }
        return profit;
    }
}
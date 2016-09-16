public class Solution {
    public int numSquares(int n) {
       int min;
       int[] dp = new int[n+1];
       dp[0]=0;
       if(n==0){
           return dp[n];
       }
       for(int i=1;i<=n;i++){
           min = i;
           for(int j=1;j*j<=i;j++){
               min = Math.min(min,dp[i-j*j]+1);
           }
           dp[i]=min;
       }
       return dp[n];
    }
}
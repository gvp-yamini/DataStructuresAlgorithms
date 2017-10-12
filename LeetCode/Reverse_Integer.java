public class Solution {
    public int reverse(int x) {
        int m=0,n,temp=0;
        n = x;
        int sign = 1;
        if(x<0){
            sign = -1;
            n = n*-1;
        }
        while(n>0){
            temp = m*10 + n%10;
            if((temp-n%10)/10 !=m){
                return 0;
            }
            m = temp;
            n = n/10;
        }
        if(sign==-1){
            return m*sign;
        }
        
        return m;
    }
}
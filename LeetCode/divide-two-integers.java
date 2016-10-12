public class Solution {
    public int divide(int dividendm, int divisorm) {
      long dividend = (long)dividendm;
      long divisor = (long)divisorm;
    int sign=1;
    if(dividend==0){
        return 0;
    }
    if(divisor==0){
        return Integer.MAX_VALUE;
    }
    if(dividend<0 && divisor<0){
        System.out.println("1");
        dividend = -1*dividend;
        divisor = -1*divisor;
    }
    if(dividend<0 && divisor>0){
        System.out.println("2");
        dividend = -1*dividend;
        sign = -1;
    }
    if(divisor<0 && dividend>0){
         System.out.println("3");
        divisor = -1*divisor;
        sign = -1;
    }
    if(divisor>dividend){
        System.out.println("4");
        return 0;
    }
    
    long counter = divideUtil(dividend,divisor);
    counter = counter*sign;
    if(counter>Integer.MAX_VALUE) 
         return Integer.MAX_VALUE;
    else if(counter< Integer.MIN_VALUE)
         return Integer.MIN_VALUE;
    else
        return (int)counter;
    }
    
    public long divideUtil(long dividend,long divisor){
        if(dividend<divisor) 
             return 0;
        long val=divisor,counter=1;
         while(divisor<<1 < dividend){
                divisor=divisor<<1;
                counter = counter<<1;
    }
    if(divisor == dividend)
        return counter;
      else{
        counter+=divideUtil(dividend-divisor, val);
    }
      return counter;
    }
}
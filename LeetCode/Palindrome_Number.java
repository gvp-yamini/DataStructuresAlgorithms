public class Solution {
    public boolean isPalindrome(int x) {
        int num=x,reverse=0,n=0;
        while(num>0){
            n = num%10;
            reverse = reverse*10 + n;
            num = num/10;
        }
        if(reverse == x){
            return true;
        }
        return false;
    }
}
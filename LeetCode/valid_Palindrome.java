public class Solution {
    public boolean isPalindrome(String s) {
      int len = s.trim().length();
      int i=0,value1,j,value2;
      if(len<2){
          return true;
      }
      s = s.toUpperCase();
      j = len-1;
      while(i<=j){
           value1 = (int)s.charAt(i);
           value2 = (int)s.charAt(j);
           if((value1 >= 65 && value1 <= 90) && (value2 >= 65 && value2 <= 90) && (value1 >= 0 && value1 <= 9) && (value2 >= 0 && value2 <= 9)){
                   if(value1==value2){
                       i++;
                       j--;
                   }else{
                      return false;
                   }
               }else if(!(value1 >= 65 && value1 <= 90) && !(value1 >= 0 && value1 <= 9)){
                   i++;
               }else if(!(value2 >= 65 && value2 <= 90) && !(value2 >= 0 && value2 <= 9)){
                   j--;
               }else{
                   return false;
               }
      }
      return true;
    }
}
public class Solution {
    public int longestPalindrome(String s) {
        int len  = s.length();
			if(len==0 || len==1){
				return len;
			}
			int hasSingle=0;
			int maxlen = 0;
		    HashMap<Character,Integer> m = new  HashMap<Character,Integer>();
	        for(int i=0;i<len;i++){
				if(m.get(s.charAt(i))==null){
					m.put(s.charAt(i), 1);
				}else{
					m.put(s.charAt(i), m.get(s.charAt(i))+1);
				}
	        }
	        for (Map.Entry<Character,Integer> entry : m.entrySet()) {
	              int val = entry.getValue();
	              if(val%2==0){
	            	  maxlen = val+maxlen;
	              }else{
	            	     hasSingle=1;
	            	     if(val>1){
	            	       maxlen = maxlen+val-1;
	            	     }
	              }
	        }
	        return maxlen+hasSingle;
    }
}
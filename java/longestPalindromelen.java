public class longestPalindromelen {

	/**
	 * @param args
	 */
	public int longestPalindrome(String s) {
        int len  = s.length();
		if(len==0 || len==1){
			return len;
		}
		int maxlen=0;
		for(int i=1;i<len;i++){
		  int low = i-1;
		  int high = i;
		  while(low>=0 && high<len && s.charAt(low)==s.charAt(high)){//odd
			  if(maxlen<high-low+1){
				  maxlen = high-low+1; 
			  }
			  low--;
			  high++;
		  }
		  low = i-1;
		  high = i+1;
		  while(low>=0 && high<len && s.charAt(low)==s.charAt(high)){//even
			  if(maxlen<high-low+1){
				  maxlen = high-low+1; 
			  }
			  low--;
			  high++;
		  }
		  
		}
		return maxlen;
    }
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		longestPalindromelen l = new longestPalindromelen();
		System.out.println(l.longestPalindrome("kaabaak"));
	}

}

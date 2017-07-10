public class Solution {
    public String countAndSay(int n) {
        StringBuilder result = new StringBuilder();
	        StringBuilder sb = new StringBuilder("1");
			int count=1,j=1,len; 
	        while(j<n){
	        	len = sb.length();
	        	count=1;
                result = new StringBuilder();
	        	for(int i=1;i<len;i++){
	        		if(sb.charAt(i-1)==sb.charAt(i)){
	        			count++;
	        		}else{
	        			result.append(Integer.toString(count));
	        			result.append(sb.charAt(i-1));
	        			count=1;
	        		}
	        	}
	        	result.append(Integer.toString(count));
    			result.append(sb.charAt(len-1));
    			sb = new StringBuilder(result);
    			j++;
	        }
	        
	        return sb.toString();
    }
}
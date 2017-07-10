public class Solution {
    public String convert(String s, int numRows) {
        if(numRows<2 || s.length()==0 || s.length()<=numRows){
            return s;
        }
        char[] c = s.toCharArray();
		int len = s.length();
		StringBuffer[] sb = new StringBuffer[numRows];
		for (int i = 0; i < sb.length; i++){
		      sb[i] = new StringBuffer();
		}
		int i=0;
		while(i<len){
			for(int j=0;j<numRows && i<len;j++){
				 sb[j].append(c[i]);
				 i++;
			}
			for(int j=numRows-2;j>=1 && i<len;j--){
				sb[j].append(c[i]);
				i++;
			}
			
		}
		for(int j=1;j<numRows;j++){
			   sb[0].append(sb[j]);
			}
			return sb[0].toString();
    
    }
}
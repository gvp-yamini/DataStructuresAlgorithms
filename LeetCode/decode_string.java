class Solution {
    public String decodeString(String s) {
      String res="";
		StringBuffer out;
		Stack resStack = new Stack();
		Stack countStack = new Stack();
		int count=0,i=0,len=0;
		len = s.length();
		while(i<len){
			if(Character.isDigit(s.charAt(i))){
				count = 0;	
			  while(i<len && Character.isDigit(s.charAt(i))){
				  count = 10 * count + (s.charAt(i) - '0');
				  i++;
			  }
			  countStack.push(count);
			}else if(s.charAt(i) == '['){
				resStack.push(res);
				res = "";
				i++;
			}else if(s.charAt(i) == ']'){
				out = new StringBuffer(resStack.pop().toString());
				count = (int) countStack.pop();
				while(count>0){
					out.append(res);
					count--;
				}
				res = out.toString();
				i++;
			}else{
				res = res + s.charAt(i);
				i++;
			}
		}
		return res;
    }
}
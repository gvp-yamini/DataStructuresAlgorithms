  public class Solution {
    public int evalRPN(String[] tokens) {
		int len = tokens.length;
		int a,b;
		Stack<Integer> st = new Stack<Integer>();
       for(int i=0;i<len;i++){
		 switch(tokens[i]){
  case "+" : 
        b = (int)st.pop();
		a = (int)st.pop();
		st.push(a+b);
		break;
  case "-" : 
        b = (int)st.pop();
		a = (int)st.pop();
		st.push(a-b);
		break;
  case "*" : 
        b = (int)st.pop();
		a = (int)st.pop();
		st.push(a*b);
		break;
  case "/" : 
        b = (int)st.pop();
		a = (int)st.pop();
		st.push(a/b);
		break;
  default:
        st.push(Integer.parseInt(tokens[i]));
}
	   }
       if(st.size()==1){
		   return (int)st.pop();
	   }
	   
	   return 0;
    }
}
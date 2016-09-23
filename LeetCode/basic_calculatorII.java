public class Solution {
    public int calculate(String s) {
        int len = s.length();
        int i;
        if(len==0 || s==null){
            return 0;
        }
        Stack<Integer> st = new Stack<Integer>();
        int result=0;
        char sign = '+';
        int num=0;
        for(i=0;i<len;i++){
            if(Character.isDigit(s.charAt(i))){
                num = num*10 + (s.charAt(i)-'0');
            }
            if(!Character.isDigit(s.charAt(i)) && s.charAt(i) !=' ' || i==len-1){
                int n=0;
                if(sign=='+'){
                    st.push(num);
                }else if(sign=='-'){
                    st.push(-num);
                }else if(sign=='/'){
                    n = st.pop();
                    st.push(n/num);
                }else if(sign=='*'){
                    n = st.pop();
                    st.push(n*num);
                }
                sign = s.charAt(i);
                num = 0;
            }
        }
        if(st.size()==0 && num!=0){
            return num;
        }
        while(st.size()>0){
            int n = st.pop();
            result = result + n;
        }
        return result;
    }
}
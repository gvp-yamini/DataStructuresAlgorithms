public class Solution {
    public boolean closingBrace(char c){
        if(c==')'||c==']'||c=='}'){
            return true;
        }
        return false;
    }
    public boolean validPairs(char t,char c){
        if(t=='('){
            if(c==')'){
                return true;
            }
        }
         if(t=='{'){
            if(c=='}'){
                return true;
            }
        }
         if(t=='['){
            if(c==']'){
                return true;
            }
        }
        return false;
    }
    public boolean isValid(String s) {
        int i=0;
        Stack st = new Stack();
        int len = s.length();
        while(i<len){
            char c = s.charAt(i);
            if(closingBrace(c)){
                if(st.size()!=0){
                  char t = (char )st.pop();
                  if(!validPairs(t,c)){
                    return false;
                }
                }else{
                    return false;
                }
            }else{
                st.push(c);
            }
            i++;
        }
        if(st.size()==0){
            return true;
        }
        return false;
    }
}
public class Solution {
    public int firstUniqChar(String s) {
        HashMap<Character,Integer> hm = new HashMap<Character,Integer>();
        int len = s.length();
        for(int i=0;i<len;i++){
            char c = s.charAt(i);
            if(hm.containsKey(c)){
                int val = hm.get(c);
                val++;
                hm.put(c,val);
            }else{
                hm.put(c,1);
            }
        }
        
        for(int i=0;i<len;i++){
              char c = s.charAt(i);
            if(hm.get(c)==1){
                return i;
            }
        }
        
        return -1;
    }
}
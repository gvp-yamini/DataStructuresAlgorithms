public class Solution {
    public boolean wordPattern(String pattern, String str) {
        HashMap<String,Character> m = new HashMap<String,Character>();
		String[] words = str.split(" ");
		int[] charset = new int[26];
		int len1,len2,i;
		len1 = pattern.length();
		len2 = words.length;
		if(len1 != len2){
			return false;
		}
		if(len1==0 && len2==0){
			return true;
		}
		i=0;
		while(i<len1){
			if(m.get(words[i]) == null){
			    if(charset[pattern.charAt(i)-'a']==1){
			      return false;  
			    }
				m.put(words[i],pattern.charAt(i));
				charset[pattern.charAt(i)-'a']=1;
			}else{
				if(pattern.charAt(i) != m.get(words[i])){
					return false;
				}
			}
			i++;
		}
		return true;
    }
}
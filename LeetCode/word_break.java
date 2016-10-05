public class Solution {
    public boolean containsInDictionary(String s,Set<String> wordDict){
        if(wordDict.contains(s)){
            return true;
        }
        return false;
    }
    public boolean wordBreak(String s, Set<String> wordDict) throws ArrayIndexOutOfBoundsException {
        int len = s.length();
        if(len==0){
            throw new ArrayIndexOutOfBoundsException("-1");
        }
        Boolean[] words = new Boolean[len+1];
        for(int i=0;i<=len;i++){
            words[i]=false;
        }
        for(int i=1;i<=len;i++){
            if(words[i]==false && containsInDictionary(s.substring(0,i),wordDict)){
                words[i]=true;
            }
            if(words[i]==true){
                if(i==len){
                    return true;
                }
                for(int j=i+1;j<=len;j++){
                    if(words[j]==false && containsInDictionary(s.substring(i,j),wordDict)){
                         words[j]=true;
                       }
                       if(j==len & words[j]==true){
                           return true;
                       }
                }
            }
        }
        
        return false;
    }
}
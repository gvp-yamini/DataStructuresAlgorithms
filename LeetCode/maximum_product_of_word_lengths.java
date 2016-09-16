public class Solution {
    public int maxProduct(String[] words) {
        int[] bitmap = new int[words.length];
        for(int i=0;i<words.length;i++){
            for(int j=0;j<words[i].length();j++){
                bitmap[i] = bitmap[i] | 1<<(words[i].charAt(j)-'a');
            }
        }
        int result = 0;
        for(int i=0;i<words.length;i++){
            for(int j=i+1;j<words.length;j++){
                if((bitmap[i] & bitmap[j])==0){
                result = Math.max(words[i].length()*words[j].length(),result);
                }
            }
        }
        return result;
    }
}
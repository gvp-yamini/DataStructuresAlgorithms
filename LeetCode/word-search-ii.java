public class Solution {
    class TrieNode{
        String word;
        TrieNode[] next = new TrieNode[26];
    }
    public TrieNode TrieBuilder(String[] words){
        TrieNode root = new TrieNode();
        for(String word : words){
            TrieNode p = root;
            for(char ch: word.toCharArray()){
                int index = ch-'a';
                if(p.next[index]==null){
                    p.next[index]= new TrieNode();
                }
                p = p.next[index];
            }
            p.word = word;
        }
        return root;
    }
    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = TrieBuilder(words);
        List<String> res = new ArrayList<>();
        for(int i=0;i<board.length;i++){
            for(int j=0;j<board[0].length;j++){
                dfs(board,i,j,root,res);
            }
        }
        return res;
    }
    public void dfs(char[][] board,int i,int j,TrieNode p,List<String> res){
        char c = board[i][j];
        if(c=='#' || p.next[c-'a'] == null){
            return;
        }
        p = p.next[c-'a'];
        if(p.word !=null){
            res.add(p.word);
            p.word = null;
        }
        board[i][j] = '#';
        if(i>0){
            dfs(board,i-1,j,p,res);
        }
        if(j>0){
             dfs(board,i,j-1,p,res);
        }
        if(i<board.length-1){
            dfs(board,i+1,j,p,res);
        }
        if(j<board[0].length-1){
           dfs(board,i,j+1,p,res); 
        }
        board[i][j]=c;
    }
}

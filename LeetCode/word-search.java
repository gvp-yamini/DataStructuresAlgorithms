public class Solution {
    public boolean exist(char[][] board, String word) {
        if(word=="" || word==null){
            return false;
        }
        for(int i=0;i<board.length;i++){
            for(int j=0;j<board[0].length;j++){
                if(board[i][j]==word.charAt(0)){
                  if(dfs(board,i,j,word,0)){
                      return true;
                  }
                }
            }
        }
        return false;
    }
    public boolean dfs(char[][] board,int i,int j,String word,int index){
        int len = word.length();
        if(index == len){
            return true;
        }
        
        if(i<0 || j<0 || i>board.length-1 || j>board[0].length-1 || board[i][j]=='#' || board[i][j] != word.charAt(index)){
            return false;
        }
        
        char c = board[i][j];
        board[i][j]='#';
  
        if(dfs(board,i-1,j,word,index+1) || dfs(board,i,j-1,word,index+1) || dfs(board,i+1,j,word,index+1) || dfs(board,i,j+1,word,index+1)){
            return true;
        }
        board[i][j]= c;
       return false; 
    }
}
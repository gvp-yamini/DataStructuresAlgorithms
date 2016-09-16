bool isValidSudoku(char** board, int boardRowSize, int boardColSize) {
   int i,j,hash[11],val,k,l;
   if(boardRowSize !=9 || boardColSize !=9){
       return false;
   }
   for(i=0;i<boardRowSize;i++){
          initialiseZero(hash);
       for(j=0;j<boardColSize;j++){
           if(board[i][j]!='.'){
               val = (int)(board[i][j]-'1');
               if(hash[val]==0){
                   hash[val] = 1;
               }else{
                   return false;
               }
           }
       }
   }
   
      for(i=0;i<boardColSize;i++){
          initialiseZero(hash);
       for(j=0;j<boardRowSize;j++){
           if(board[j][i]!='.'){
               val = (int)(board[j][i]-'1');
               if(hash[val]==0){
                   hash[val] = 1;
               }else{
                   return false;
               }
           }
       }
   }
for(k=0;k<boardColSize;k=k+3){
  for(l=0;l<boardRowSize;l=l+3){
       initialiseZero(hash);
	for(i=k;i<k+3;i++){
           for(j=l;j<l+3;j++){
             if(board[i][j]!='.'){
               val = (int)(board[i][j]-'1');
               if(hash[val]==0){
                   hash[val] = 1;
               }else{
                   return false;
               }
             }
           }
        }
      }
   }
   return true;
}

void initialiseZero(int *hash){
    int i;
    for(i=0;i<10;i++){
        hash[i]=0;
    }
}
#include "stdafx.h"
#include "conio.h"
#include "stdio.h"
bool isValidSudoku(char** board, int boardRowSize, int boardColSize);
void initialiseZero(int *hash);
void main(){
	char **board;
}
bool isValidSudoku(char** board, int boardRowSize, int boardColSize) {
   int i,j,hash[11],val;
   for(i=0;i<boardRowSize;i++){
          initialiseZero(hash);
       for(j=0;j<boardColSize;j++){
           if(board[i][j]!='.'){
               val = atoi(board[i][j]);
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
           if(board[i][j]!='.'){
               val = atoi(board[i][j]);
               if(hash[val]==0){
                   hash[val] = 1;
               }else{
                   return false;
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
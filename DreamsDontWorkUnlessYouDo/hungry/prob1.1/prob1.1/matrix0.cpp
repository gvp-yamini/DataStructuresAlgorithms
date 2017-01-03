#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
void setZeroes(int** matrix, int matrixRowSize, int matrixColSize);
void main(){
	int matrix[5][4],i,j;
	printf("enter matrix\n");
	for(i=0;i<5;i++){
		for(j=0;j<4;j++){
			scanf("%d",&matrix[i][j]);
		}
		printf("\n");
	}
	setZeroes(matrix,5,4);
	getch();
}


void setZeroes(int** matrix, int matrixRowSize, int matrixColSize) {
    int i,j;
    for(i=0;i<matrixRowSize;i++){
        for(j=0;j<matrixColSize;j++){
            if(matrix[i][j]==0){
                matrix[i][0]=0;
                matrix[0][j]=0;
            }
        }
    }
    
    for(i=0;i<matrixRowSize;i++){
       if(matrix[i][0]==0){
           for(j=0;j<matrixColSize;j++){
               matrix[i][j]=0;
           }
       }
    }
    for(i=0;i<matrixColSize;i++){
       if(matrix[0][i]==0){
           for(j=0;j<matrixRowSize;j++){
               matrix[j][i]=0;
           }
       }
    }
    
}
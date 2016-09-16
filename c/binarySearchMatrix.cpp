#include "stdafx.h"
#include "conio.h"
#include "stdio.h"

bool searchMatrix(int** matrix, int matrixRowSize, int matrixColSize, int target) {
   return binarySearchMatrix(matrix,0,matrixRowSize,0,matrixColSize,target);
}

bool binarySearchMatrix(int** matrix, int rowLow, int rowHigh, int colLow, int colHigh, int target){
    int rowMid = rowLow + (rowHigh - rowLow)/2;
    int colMid = colLow + (colHigh - colLow)/2;
    if(matrix[colMid][rowMid]==target){
        return true;
    }else if(matrix[colMid][rowLow]<target && matrix[colMid][rowMid]>target){
        return binarySearchMatrix(matrix,rowLow,rowMid-1,colLow,colHigh,target);
    }else if(matrix[colMid][rowHigh]>target && matrix[colMid][rowMid]<target){
        return binarySearchMatrix(matrix,rowMid+1,rowHigh,colLow,colHigh,target);
    }else if(matrix[colLow][rowMid]<target && matrix[colMid][rowMid]>target){
         return binarySearchMatrix(matrix,rowLow,rowHigh,colLow,colMid-1,target);
    }else if(matrix[colHigh][rowMid]>target && matrix[colMid][rowMid]<target){
         return binarySearchMatrix(matrix,rowLow,rowHigh,colMid+1,colHigh,target);
    }else{
    return false;
    }
}

void main(){
	int mat[4][3] = {{1,   3,  5,  7},{10, 11, 16, 20},{23, 30, 34, 50}};
    if(searchMatrix(mat,4,3,3)){
		printf("true");
	}else{
		printf("false");
	}
	getch();
}
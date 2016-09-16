bool searchMatrix(int** matrix, int matrixRowSize, int matrixColSize, int target) {
    int i,j;
    i= 0;
    j = matrixColSize-1;
    
    while(i<matrixRowSize && j>=0){
    if(matrix[i][j]==target){
        return true;
    }else if(matrix[i][j]<target){
        i++;
    }else{
        j--;
    }
    }
    return false;
    
}
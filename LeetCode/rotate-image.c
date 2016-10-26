void rotate(int** matrix, int matrixRowSize, int matrixColSize) {
 int i=0,j=0,temp=0;
 for(i=0;i<matrixRowSize;i++){
     for(j=i+1;j<matrixColSize;j++){
         temp = matrix[i][j];
         matrix[i][j] = matrix[j][i];
         matrix[j][i] = temp;
     }
 }  
 for(i=0;i<matrixRowSize;i++){
     for(j=0;j<matrixColSize-j-1;j++){
         temp = matrix[i][j];
         matrix[i][j] = matrix[i][matrixColSize-j-1];
         matrix[i][matrixColSize-j-1] = temp;
     }
 }
}
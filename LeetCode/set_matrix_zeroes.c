void setZeroes(int** matrix, int matrixRowSize, int matrixColSize) {
    int i,j,firstrowHasZero=0,firstcolumnHasZero=0;
    for(i=0;i<matrixColSize;i++){
           if(matrix[0][i]==0){
               firstrowHasZero =1;
               break;
           }
       }
    for(i=0;i<matrixRowSize;i++){
           if(matrix[i][0]==0){
               firstcolumnHasZero =1;
               break;
           }
       }
    
    for(i=1;i<matrixRowSize;i++){
                for(j=1;j<matrixColSize;j++){
                    if(matrix[i][j] == 0){
                        matrix[i][0]=0;
                        matrix[0][j]=0;
                    }
                }
            }
    for(i=1;i<matrixColSize;i++){
        if(matrix[0][i]==0){
            for(j=1;j<matrixRowSize;j++){
                matrix[j][i]=0;
            }
        }
    }
    
        for(i=1;i<matrixRowSize;i++){
        if(matrix[i][0]==0){
            for(j=1;j<matrixColSize;j++){
                matrix[i][j]=0;
            }
        }
    }
       if(firstrowHasZero){

               for(j=0;j<matrixColSize;j++){
                   matrix[0][j]=0;
               }
      }
      
      if(firstcolumnHasZero){
         for(j=0;j<matrixRowSize;j++){
                   matrix[j][0]=0;
               }
      }
        
}
int kthSmallest(int** matrix, int matrixRowSize, int matrixColSize, int k) {
    int mid,count=0,i,j;
    int minVal = matrix[0][0];
    int maxVal = matrix[matrixColSize-1][matrixRowSize-1];
    if(matrixRowSize*matrixColSize<k){
        return -1;
    }
    while(minVal<maxVal){
        mid = minVal + (maxVal-minVal)/2;
        j= matrixRowSize - 1;
        count = 0;
        for(i=0;i<matrixColSize;i++){
            while(j>=0&&matrix[i][j]>mid){
                j--;
            }
            count = count + j+1;
        }
        if(count<k){
            minVal = mid+1;
        }else{
            maxVal = mid;
        }
    }
    return maxVal;
}
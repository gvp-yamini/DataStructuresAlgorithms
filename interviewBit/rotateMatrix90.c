void rotate(int** A, int n11, int n12) {
    int i=0,j=0;
    int temp;
  for(i=0;i<n11;i++){
      for(j=i+1;j<n12;j++){
          temp = A[i][j];
          A[i][j] = A[j][i];
          A[j][i] = temp;
      }
  }
  for(i=0;i<n11;i++){
      for(j=0;j<n12-1-j;j++){
          temp = A[i][j];
          A[i][j] = A[i][n12-1-j];
          A[i][n12-1-j] = temp;
      }
  }
}
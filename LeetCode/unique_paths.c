int uniquePaths(int m, int n) {
        int pathCount[m][n];
        memset(pathCount, 0, sizeof(pathCount));
        pathCount[m - 1][n - 1] = 1;
        for(int j=n-1;j>=0;j--){
            for(int i=m-1;i>=0;i--){
                if(j<n-1){
                   pathCount[i][j] =  pathCount[i][j] + pathCount[i][j+1];
                }
                if(i<m-1){
                   pathCount[i][j] =  pathCount[i][j] + pathCount[i+1][j];
                }
            }
        }
        return pathCount[0][0];
}
int isSafe(char **grid,int i,int j,int m,int n,int visited[m][n]){
    if((i>=0) && (i<m) && (j>=0) && (j<n) && (visited[i][j]==0 && grid[i][j]=='1')){
        return 1;
    }
    return 0;
}
void dfs(char **grid,int i,int j,int m,int n,int visited[m][n]){
    int row[] = {-1,0,0,1};
    int col[] = {0,-1,1,0};
    visited[i][j] = 1;
    for(int k=0;k<4;k++){
        if(isSafe(grid,i+row[k],col[k]+j,m,n,visited)){
            dfs(grid,i+row[k],col[k]+j,m,n,visited);
        }
    }
}
int numIslands(char** grid, int gridRowSize, int gridColSize) {
    int i,j,count=0;
    int visited[gridRowSize][gridColSize];
    for(i=0;i<gridRowSize;i++){
        for(j=0;j<gridColSize;j++){
            visited[i][j]=0;
        }
    }
    
    for(i=0;i<gridRowSize;i++){
        for(j=0;j<gridColSize;j++){
            if(grid[i][j]=='1' && visited[i][j]==0){
                 dfs(grid,i,j,gridRowSize,gridColSize,visited);
                 count++;
            }
        }
    }
    return count;
}
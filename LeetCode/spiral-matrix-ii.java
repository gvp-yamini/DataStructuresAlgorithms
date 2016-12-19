public class Solution {
    public int[][] generateMatrix(int n) {
        int[][] matrix = new int[n][n];
        int row=0,col=0,i=0,num=1;
        int totalrow=n,totalcol=n;
        while(row<totalrow && col<totalcol){
            for(i=col;i<totalcol;i++){
                matrix[row][i]=num;
                num++;
            }
            row++;
            for(i=row;i<totalrow;i++){
                matrix[i][totalcol-1]=num;
                num++;
            }
            totalcol--;
            
            for(i=totalcol-1;i>=col;i--){
                matrix[totalrow-1][i]=num;
                num++;
            }
            totalrow--;
            for(i=totalrow-1;i>=row;i--){
                matrix[i][col]=num;
                num++;
            }
            col++;
        }
        return matrix;
    }
}
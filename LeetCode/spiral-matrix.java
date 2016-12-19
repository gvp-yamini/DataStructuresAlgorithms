public class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<Integer>();
        if(matrix==null|| matrix.length==0 || matrix[0].length==0){
            return result;
        }
        int m = matrix.length;
        int n = matrix[0].length;
        int row=0,col=0;
        while(row<m && col<n){
               if(m==1){
                for(int i=0; i<n; i++){
                    result.add(matrix[row][i]);
                }
                break;
            }else if(n==1){
                for(int i=0; i<m; i++){
                    result.add(matrix[i][col]);
                }
                break;
            }
               for(int i=col;i<n;i++){
                   result.add(matrix[row][i]);
               }
               row++;
               for(int i=row;i<m;i++){
                   result.add(matrix[i][n-1]);
               }
               n--;
               if(row<m){
               for(int i=n-1;i>=col;i--){
                   result.add(matrix[m-1][i]);
               }
               m--;
               }
               if(col<n){
               for(int i= m-1;i>=row;i--){
                   result.add(matrix[i][col]);
               }
               col++;
               }
        }
        return result;
    }
}
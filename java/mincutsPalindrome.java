import java.util.*;

public class mincutsPalindrome {

	/**
	 * @param args
	 */
	    public int minCut(String s) {
	    	
	       int len = s.length();	
	       int[][] p = new int[len+1][len+1]; 
	       int[][] c = new int[len+1][len+1];
	       for(int i=0;i<len;i++){
	    	   p[i][i]=1;
	    	   c[i][i]=0;
	       }
	       int j=0;
	       for(int l=2;l<=len;l++){
	    	   for(int i=0;i<len-l+1;i++){
	    	      j = i+l-1;
	    	      if(l==2){
	    	    	 if(s.charAt(i) == s.charAt(j)){
	    	    		 p[i][j]=1;
	    	    	 }
	    	      }else{
	    	    	  if((s.charAt(i) == s.charAt(j)) && p[i+1][j-1]==1){
		    	    		 p[i][j]=1;
		    	    	 }
	    	      }
	    	      
	    	      if(p[i][j]==1){
	    	    	  c[i][j]=0;
	    	      }else{
	    	    	  c[i][j] = Integer.MAX_VALUE;
	    	    	  for(int k=i;k<=j;k++){
	    	    		  c[i][j]=Math.min(c[i][j],c[i][k]+c[k+1][j]+1);
	    	    	  }
	    	      }
	    	      
	    	   }
	       }
	       return c[0][len-1]; 
	    }
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		mincutsPalindrome mp = new mincutsPalindrome();
	    System.out.println(mp.minCut("aaa"));
	}

}

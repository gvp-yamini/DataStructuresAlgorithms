import java.util.*;

public class minCutsOptimal {

	/**
	 * @param args
	 */
	public int mincuts(String s){
		int len = s.length();
		int[] cuts = new int[len+1];
		for(int i=0;i<=len;i++){
			cuts[i]=i-1;
		}
		for(int j=0;j<len;j++){
			for(int i=0;(j-i>=0 && i+j<len) && s.charAt(j-i)==s.charAt(i+j);i++){
				cuts[i+j+1]=Math.min(cuts[i+j+1], cuts[j-i]+1);
						
			}
			for(int i=1;(j-i+1>=0 && i+j<len) && s.charAt(j-i+1)==s.charAt(i+j);i++){
				cuts[i+j+1]=Math.min(cuts[j-i+1]+1,cuts[i+j+1]);
			}
			
		}
		return cuts[len];
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		minCutsOptimal m = new minCutsOptimal();
		System.out.println(m.mincuts("aabaa"));
	}

}

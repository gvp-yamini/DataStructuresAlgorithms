package linkedList;
import java.util.*;

public class MaximumLengthChainPairs {
	Pairs pairs[];
	int n;
	private static class Pairs implements Comparable{
		int a;
		int b;
		public Pairs(int a,int b){
			this.a = a;
			this.b = b;
		}
		public int compareTo(Object o){
			return this.a - ((Pairs)o).a;
		}
	}
	/**
	 * @param args
	 */
	private static void createPairs(int pairs[][]){
		int n = pairs.length;
		List<Pairs> lst = new ArrayList<Pairs>();
		for(int i=0;i<n;i++){
			lst.add(new Pairs(pairs[i][0],pairs[i][1]));
		}
		Collections.sort(lst);
		
		int[] max = new int[n];
		int maxVal = 1;
		for(int i=0;i<n;i++){
			max[i]=1;
		}
		for(int i=1;i<n;i++){
			for(int j=0;j<i;j++){
				if(lst.get(i).a>lst.get(j).b && max[i]<max[j]+1){
					max[i] = max[j]+1;
				}
			}
		}
		for(int i=0;i<n;i++){
			if(max[i]>maxVal){
				maxVal = max[i];
			}
		}
		System.out.println(maxVal);
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		int arr[][] = {{5, 24}, {39, 60}, {15, 28}, {27, 40}, {50, 90} };
		createPairs(arr);
		
	}

}

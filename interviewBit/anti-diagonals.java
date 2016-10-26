public class Solution {
	public ArrayList<ArrayList<Integer>> diagonal(ArrayList<ArrayList<Integer>> a) {
	   	 ArrayList<ArrayList<Integer>> result = new ArrayList<ArrayList<Integer>>();
		 ArrayList<Integer> temp = new ArrayList<Integer>();
		 int m = a.size();
		 int n = a.get(0).size();
		 temp.add(a.get(0).get(0));
		 result.add(new ArrayList<Integer>(temp));
		 int j;
         int i = 0;
         j = i+1;
         while(j < n){
             int k = i;
             int l = j;
             temp.clear();
             while(k < m && l >= 0){
                 temp.add(a.get(k).get(l));
                 k++;
                 l--;
             }
             result.add(new ArrayList<Integer>(temp));
             j++;
         }
         
         i = 1;
         j = n-1;
         while(i < m){
             int k = i;
             int l = j;
             temp.clear();
             while(k < m && l >= 0){
                 temp.add(a.get(k).get(l));
                 k++;
                 l--;
             }
             result.add(new ArrayList<Integer>(temp));
             i++;
         }     
     temp.clear();
     return result;
	}
}

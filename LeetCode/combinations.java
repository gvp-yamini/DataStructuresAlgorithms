public class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<List<Integer>>();
        List<Integer> temp = new ArrayList<Integer>();
        if(n==0 || k==0 || n<k){
            return result;
        }
        insert(result,temp,n,k,1);
        return result;
    }
    
    public void insert(List<List<Integer>> result,List<Integer> temp,int n,int k,int start){
        if(temp.size()==k){
            result.add(new ArrayList<Integer>(temp));
            return;
        }
        for(int i=start;i<=n;i++){
            if(temp.size()+n-i+1<k){
               break; 
            }
            temp.add(i);
            insert(result,temp,n,k,i+1);
            temp.remove(temp.size()-1);
        }
    }
}
import java.util.*;
import java.util.Arrays;
public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result=new ArrayList<List<Integer>>();
        if(nums==null || nums.length==0){
            return result;
        }
        List<Integer> temp=new ArrayList<Integer>();
        result.add(temp);
        Arrays.sort(nums);
        for(int i=0;i<nums.length;i++){
            insert(nums[i],result);
        }
        return result;
    }
    public void insert(int i,List<List<Integer>> result){
       List<List<Integer>> tempresult=new ArrayList<List<Integer>>();
       for(List<Integer> current : result){
          List<Integer> temp=new ArrayList<Integer>(current);
          temp.add(i);
          tempresult.add(temp);
       }
       result.addAll(tempresult);
    }
}
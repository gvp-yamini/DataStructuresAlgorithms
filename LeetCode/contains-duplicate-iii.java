public class Solution {
    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        if(nums==null || nums.length <2 || k<0 || t<0){
            return false;
        }
        int l = nums.length;
        TreeSet<Long> set = new TreeSet<Long>();
        for(int i=0;i<l;i++){
           long element = (long)nums[i];
           long leftRange = element-t;
           long rightrange = element+t+1;
           SortedSet<Long> sub= set.subSet(leftRange,rightrange);
           if(sub.size()>0){
               return true;
           }
           set.add(element);
           
           if(set.size()>k){
               set.remove((long)nums[i-k]);
           }
        }
        return false;
    }
}
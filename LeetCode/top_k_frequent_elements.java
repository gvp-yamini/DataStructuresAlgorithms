import java.util.HashMap;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.*;

public class Solution {
    public List<Integer> topKFrequent(int[] nums, int k) {
      HashMap<Integer, Integer> hmap = new HashMap<Integer, Integer>();
	  int count=0;
      for(int i=0;i<nums.length;i++){
       	  if(hmap.get(nums[i])!=null){
		    count = hmap.get(nums[i]);
			count++;
			hmap.put(nums[i],count);
		  }else{
		     hmap.put(nums[i],1);
		  }
    }
	    Set<Entry<Integer, Integer>> set = hmap.entrySet();
        List<Entry<Integer, Integer>> list = new ArrayList<Entry<Integer, Integer>>(set);
        Collections.sort( list, new Comparator<Map.Entry<Integer, Integer>>()
        {
            public int compare( Map.Entry<Integer, Integer> o1, Map.Entry<Integer, Integer> o2 )
            {
                return (o2.getValue()).compareTo( o1.getValue() );
            }
        } );
		  int count1 =0;
		  List<Integer> slist = new ArrayList<Integer>();
		   for(Map.Entry<Integer, Integer> entry:list){
		   count1++;
	        if(count1<=k){
			slist.add(new Integer(entry.getKey()));
			}else{
			  break;
			}
        }
		return slist;
	}
}
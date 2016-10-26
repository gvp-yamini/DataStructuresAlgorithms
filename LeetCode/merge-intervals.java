/**
 * Definition for an interval.
 * public class Interval {
 *     int start;
 *     int end;
 *     Interval() { start = 0; end = 0; }
 *     Interval(int s, int e) { start = s; end = e; }
 * }
 */
class IntervalSorter implements Comparator{
    public int compare(Object o1,Object o2){
        Interval i1 = (Interval) o1;
        Interval i2 = (Interval) o2;
        return i1.start - i2.start;
    }
}
public class Solution {
    public int max(int a,int b){
        if(a>b){
           return a; 
        }
        return b;
    }
    public List<Interval> merge(List<Interval> intervals) {
        int len = intervals.size();
        if(len<2){
           return intervals;
        }
        List<Interval> result = new ArrayList<Interval>();
        Collections.sort(intervals,new IntervalSorter());
        Interval firstOb = intervals.get(0);
        Interval curr;
        int st,en;
        st = firstOb.start;
        en = firstOb.end;
        System.out.println(st);
        System.out.println(en);
        for(int i=1;i<len;i++){
            curr = intervals.get(i);
            if(curr.start<=en){
                en = max(en,curr.end);
                if(curr.start<st){
                    st = curr.start;
                }
            }else{
                result.add(new Interval(st,en));
                st = curr.start;
                en = curr.end;
            }
        }
        result.add(new Interval(st, en));
        return result;
    }
}
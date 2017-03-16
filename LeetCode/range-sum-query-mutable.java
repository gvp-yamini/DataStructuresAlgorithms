public class NumArray {
    
    class segmentedTree{
        int sum;
        segmentedTree left,right;
        int start,end;
        segmentedTree(int start,int end){
            this.start = start;
            this.end = end;
            left = null;
            right = null;
            sum=0;
        }
    }
    
    segmentedTree root = null;
    public segmentedTree buildSegmentedtree(int[] nums,int start,int end){
        if(start>end){
            return null;
        }else{
           segmentedTree ret = new segmentedTree(start,end);
           if(start==end){
             ret.sum = nums[start];
           }else{
               int mid = start + (end-start)/2;
               ret.left = buildSegmentedtree(nums,start,mid);
               ret.right = buildSegmentedtree(nums,mid+1,end);
               ret.sum = ret.left.sum + ret.right.sum;
           }
           return ret;
        }
    }
    public NumArray(int[] nums) {
        root = buildSegmentedtree(nums,0,nums.length-1);
    }
    
    public void update(segmentedTree root,int i,int val){
        if(root.start==root.end){
            root.sum=val;
        }else{
            int mid = root.start + (root.end-root.start)/2;
            if(i<=mid){
                update(root.left,i,val);
            }else{
                update(root.right,i,val);
            }
            root.sum = root.left.sum + root.right.sum;
        }
    }
    public void update(int i, int val) {
        update(root,i,val);
    }
    public int sumRange(int i, int j){
        return sumRange(root,i,j);
    }
    public int sumRange(segmentedTree root,int start, int end) {
        if(root.start==start && root.end==end){
            return root.sum;
        }else{
          int mid = root.start + (root.end-root.start)/2;
         if(end<=mid){
           return sumRange(root.left,start,end);
        }else if(start>mid){
           return sumRange(root.right,start,end);
        }else{
            return sumRange(root.left,start,mid) + sumRange(root.right,mid+1,end);
        }
    }
}
}

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray obj = new NumArray(nums);
 * obj.update(i,val);
 * int param_2 = obj.sumRange(i,j);
 */
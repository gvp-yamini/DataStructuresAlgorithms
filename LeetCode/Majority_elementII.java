public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        int a=0,b=0,c1=0,c2=0;
        int l = nums.length;
        for(int i=0;i<l;i++){
            if(nums[i]==a){
                c1++;
            }else if(nums[i]==b){
                c2++;
            }else if(c1==0){
                a = nums[i];
                c1=1;
                }else if(c2==0){
                    b = nums[i];
                    c2=1;
                    }else{
                c1--;
                c2--;
            }
        }
        c1=0;c2=0;
        for(int i=0;i<l;i++){
            if(nums[i]==a){
               c1++; 
            }
            if(nums[i]==b){
                c2++;
            }
        }
        List<Integer> res = new ArrayList<Integer>();
        if(c1>l/3){
           res.add(a); 
        }
        if(c2>l/3 && a != b){
            res.add(b);
        }
        return res;
    }
}
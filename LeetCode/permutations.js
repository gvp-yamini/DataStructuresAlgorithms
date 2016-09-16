/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    var res=[];
    var generate = function(k,n){
        if(k==n){
           res.push(nums); 
        }else{
            for(var j=k;j<=n;j++){
              var temp = nums[k];
              nums[k] = nums[j];
              nums[j] = temp;
                generate(k+1,n);
               temp = nums[k];
              nums[k] = nums[j];
              nums[j] = temp;
            }
        }
    };
   generate(0,nums.length-1); 
   return res;
};
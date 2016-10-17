/*
Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
For example, given array S = [-1, 0, 1, 2, -1, -4],
A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]
*/
public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    if(nums == null || nums.length < 3) return result;
    Arrays.sort(nums);

    int len = nums.length;
    for(int i = 0; i < len; i++) {
        if(i > 0 && nums[i] == nums[i - 1]) continue;        // Skip same results
        int target = 0 - nums[i];
        int j = i + 1, k = len - 1;
        while(j < k) {
            if(nums[j] + nums[k] == target) {
                result.add(Arrays.asList(nums[i], nums[j], nums[k]));
                while(j < k && nums[j] == nums[j + 1]) j++;  // Skip same results
                while(j < k && nums[k] == nums[k - 1]) k--;  // Skip same results
                j++; k--;
            } else if(nums[j] + nums[k] < target) {
                j++;
            } else {
                k--;
            }
        }
    }
    return result;
 }
}
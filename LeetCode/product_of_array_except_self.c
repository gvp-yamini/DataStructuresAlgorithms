/**
 * Return an array of size *returnSize.
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    int *Array,i,temp;
    returnSize = (int *)malloc(sizeof(int )*numsSize);
    Array = (int *)malloc(sizeof(int )*numsSize);
    Array[0]=1;
    Array[numsSize-1]=1;
    
    for(i=1;i<numsSize;i++){
       Array[i] = Array[i-1]*nums[i-1];
    }
    temp=nums[numsSize-1];
    for(i=numsSize-2;i>=0;i--){
        Array[i] = Array[i]*temp;
        temp = temp*nums[i];
    }
    return returnSize;
}
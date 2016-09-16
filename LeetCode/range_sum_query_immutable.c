struct NumArray {
    int sum;
};

/** Initialize your data structure here. */
struct NumArray* NumArrayCreate(int* nums, int numsSize) {
    int i = 0;
    struct NumArray* numArray = (struct NumArray*)malloc(sizeof(struct NumArray)*(numsSize+1));
    numArray[0].sum = nums[0];
    for(i=1;i<numsSize;i++){
        numArray[i].sum = numArray[i-1].sum + nums[i];
    }
    return numArray;
}

int sumRange(struct NumArray* numArray, int i, int j) {
    if(i==0)
     return numArray[j].sum;
    else
     return numArray[j].sum - numArray[i-1].sum;
}

/** Deallocates memory previously allocated for the data structure. */
void NumArrayFree(struct NumArray* numArray) {
    free(numArray);
}

// Your NumArray object will be instantiated and called as such:
// struct NumArray* numArray = NumArrayCreate(nums, numsSize);
// sumRange(numArray, 0, 1);
// sumRange(numArray, 1, 2);
// NumArrayFree(numArray);
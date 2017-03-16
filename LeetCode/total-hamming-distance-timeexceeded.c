int hammingDistance(int x, int y) {
    int hammingdist = 0,count=0,flag=1;
    while(count<32){
        if((x&flag || y&flag) && !(x&flag && y&flag)){
             hammingdist++;
        }
        flag = flag<<1;
        count++;
    }
    return hammingdist;
}

void printAllCombinations(int* nums,int start,int end,int index,int r,int *dist,int *data){
    //printf("---->");
    int i=0;
    if(index==r){
       *dist = *dist + hammingDistance(data[0],data[1]);
       //printf("%d",*dist);
       return;
    }
    for(i=start;i<=end && end-i+1>=r-index;i++){
        data[index]=nums[i];
        printAllCombinations(nums,i+1,end,index+1,r,dist,data);
    }
}
int totalHammingDistance(int* nums, int numsSize) {
    int dist = 0;
    int *data;
    data = (int *)malloc(sizeof(int )*2);
    data[0]=0;
    data[1]=0;
    if(numsSize<2){
        return 0;
    }
    printAllCombinations(nums,0,numsSize-1,0,2,&dist,data);
    return dist;
}
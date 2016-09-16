void sortColors(int* nums, int numsSize) {
	int i=0,mid=0,j=numsSize-1,temp=0;
	while(mid<=j){
		if(nums[mid]==1){
			mid++;
		}else if(nums[mid]==0){
			temp=nums[i];
			nums[i]=nums[mid];
			nums[mid] = temp;
			i++;
			mid++;
		}else if(nums[mid]==2){
			temp=nums[j];
			nums[j]=nums[mid];
			nums[mid] = temp;
			j--;
		}
	}
}
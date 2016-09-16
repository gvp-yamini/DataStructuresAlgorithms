int singleNumber(int* nums, int numsSize) {
int i,j,mask =1,num=0,count;
for(i=0;i<32;i++){
	count=0;
	for(j=0;j<numsSize;j++){
		if(nums[j]&mask){
		  count++;
		}
	}
	if(count%3){
	  num = num | mask;
	}
	mask = mask<<1;
}
return num;
}
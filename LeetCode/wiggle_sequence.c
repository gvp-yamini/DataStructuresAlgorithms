int wiggleMaxLength(int* nums, int numsSize) {
    int i=0,counter=0,prevdiff,diff;
    if(numsSize<2){
        return numsSize;
    }
    prevdiff= nums[1]-nums[0];
    if(prevdiff==0){
      counter=1;  
    }else{
    counter = 2;
    }
    for(i=2;i<numsSize;i++){
		diff = nums[i]-nums[i-1];
        if((prevdiff<=0 && diff>0)||(prevdiff>=0 && diff<0)){
            counter++;
			prevdiff=diff;
        }
    }
    
     return counter;
}
  
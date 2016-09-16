uint32_t reverseBits(uint32_t n) {
uint32_t maskleft = 10000000000000000000000000000000;
uint32_t maskright = 00000000000000000000000000000001;
int ntimes=0;
int left=0,right=0;
    while(ntimes<16){
	    left = maskleft&n;
        right = maskright&n;
		if(left==maskleft&&right==0){
		 n = n^maskleft;
		 n = n|maskright;
		}else if(left==0&&right==maskright){
		 n = n^maskright;
		 n = n|maskleft;
		}
	  maskleft = maskleft>>1;
	  maskright = maskright<<1;
	  ntimes++;
	}
	return n;
}
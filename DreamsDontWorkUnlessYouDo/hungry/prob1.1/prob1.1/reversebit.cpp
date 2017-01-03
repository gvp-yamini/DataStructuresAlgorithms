#include "stdafx.h"
#include "stdint.h"
#include "stdio.h"
#include "conio.h"
uint32_t reverseBits(uint32_t n);
void main(){
	uint32_t num = 2,n1;
	n1=reverseBits(num);
	getch();
}

uint32_t reverseBits(uint32_t n) {
uint32_t maskleft =   2147483648;
uint32_t maskright = 1;
int ntimes=0;
int left=0,right=0;
    while(ntimes<=16){
	    left = maskleft&n;
        right = maskright&n;
		if(left==1&&right==0){
		 n = n^maskleft;
		 n = n|maskright;
		}else if(left==0&&right==1){
		 n = n^maskright;
		 n = n|maskleft;
		}
	  maskleft = maskleft>>1;
	  maskright = maskright<<1;
	  ntimes++;
	}
	return n;
}
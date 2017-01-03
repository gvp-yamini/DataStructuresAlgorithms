#include "stdafx.h"
#include "conio.h"
#include "stdio.h"

bool isHappy(int );
int sumOfSquaresFun(int );
void main(){
	int inputVal=0;
	printf("enter a value\n");
	scanf("%d",&inputVal);
	if(isHappy(inputVal)){
		printf("Happy Number\n");
	}else{
		printf("Not\n");
	}
	getch();
}

bool isHappy(int n) {
    int sumOfSquares = n;
    while(sumOfSquares>0){
		if(sumOfSquares==1){
			return true;
		}else if(sumOfSquares==4){
			return false;
		}else{
        sumOfSquares = sumOfSquaresFun(sumOfSquares);
		}
    }
}

int sumOfSquaresFun(int n){
    int sum = 0,m=0;
    while(n){
        m = n%10;
        sum = sum + m*m;
        n=n/10;
    }
    return sum;
}
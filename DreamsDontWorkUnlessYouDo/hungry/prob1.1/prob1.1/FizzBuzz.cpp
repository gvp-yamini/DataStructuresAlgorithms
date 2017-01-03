#include "stdafx.h"
#include <stdio.h>
#include <stdlib.h>
#include "conio.h"
int main(){
int noOfTests,*eachTests,i,j;
scanf("%d",&noOfTests);
eachTests = (int *)malloc((noOfTests+1)*sizeof(int));
for(i=0;i<noOfTests;i++){
	scanf("%d",&eachTests[i]);
}
for(i=0;i<noOfTests;i++){
	for(j=0;j<eachTests[i];j++){
		if(j%3==0 && j%5==0){
			printf("FizzBuzz\n");
		}else if(j%3==0){
			printf("Fizz\n");
		}else if(j%5==0){
			printf("Buzz\n");
		}else{
			printf("%d\n",j);
		}
	}
}
getch();
return 0;
}
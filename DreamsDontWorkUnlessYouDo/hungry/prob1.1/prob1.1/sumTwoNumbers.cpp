#include "stdafx.h"
#include <stdio.h>
#include <stdlib.h>
#include "conio.h"
int main(){
double noOfTests,**eachTests;
int i;
scanf("%f\n",&noOfTests);
eachTests = (double **)malloc((noOfTests+1)*sizeof(double*));
for(i=0;i<noOfTests;i++){
	eachTests[i] = (double *)malloc(2*sizeof(double));
}
for(i=0;i<noOfTests;i++){
	scanf("%f %f",&eachTests[i][0],&eachTests[i][1]);
}
for(i=0;i<noOfTests;i++){
	printf("%f\n",eachTests[i][0]+eachTests[i][1]);
}
getch();
return 0;
}
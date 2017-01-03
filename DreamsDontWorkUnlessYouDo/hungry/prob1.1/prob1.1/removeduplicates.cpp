#include "stdafx.h"
#include "stdio.h"
#include "conio.h"

void main(){
	int a[20]={1,2,2,2,3,3,3,4,4,5,5,5,5};
	int j=0,i=1,count=0;
while(i<13){
  if(a[j]==a[i]){
   i++;
   count++;
   if(count==1){
	    j++;
        a[j]=a[i-1];
   }
  }else{
  count=0;
  j++;
  a[j]=a[i];
  i++;
  }
}
printf("%d-->",j+1);
for(i=0;i<j+1;i++){
	printf("%d",a[i]);
}
getch();
}
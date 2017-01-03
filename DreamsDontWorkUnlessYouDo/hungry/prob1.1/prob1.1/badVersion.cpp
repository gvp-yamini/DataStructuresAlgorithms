#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
int isBadVersion(int );
int firstBadVersion(int );
int BinarySearch(int ,int );

void main(){
	int n,num;
	//printf("enter last version\n");
	//scanf("%d",&n);
	num = firstBadVersion(2126753390);
	printf("%d\n",num);
	getch();
}

int firstBadVersion(int n) {
    int badVersion = 0;
    badVersion = BinarySearch(0,n);
	return badVersion;
}

int BinarySearch(int low,int high){
	int mid = low+(high-low)/2;
	if(isBadVersion(mid)){
		while(mid>=low){
			if(isBadVersion(mid-1)){
				mid = mid-1;
			}else{
				return mid;
			}
		}
	}else{
		if(mid==(high-1)&&!(isBadVersion(mid))){
			return high;
		}
		BinarySearch(mid+1,high);
	}
}

int isBadVersion(int n){
	if(n>=1702766719){
		return 1;
	}else{
		return 0;
	}
}
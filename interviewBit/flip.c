/**
 * @input A : String termination by '\0'
 * 
 * @Output Integer array. You need to malloc memory, and fill the length in len1
 
 */
 #include "stdlib.h"
int* flip(char* A, int *len1) {
    int *B;
    int len=0;
    char *temp=A;
    while(*temp !='\0'){
        len++;
        temp++;
    }
    B = (int *)malloc(sizeof(int )*len);
    int i=0,sum=0;
    for(i=0;i<len;i++){
        if(A[i]=='0'){
            B[i]=1;
        }else{
            sum = sum + 1;
            B[i]=-1;
        }
    }
    len1 = (int *)malloc(sizeof(int )*2);
    if(sum==len){
        return len1;
    }
    int finalVal=0,finalLeft=1,finalRight=0;
    int tempVal=0,tempLeft=1;
    for(i=0;i<len;i++){
        if(tempVal+B[i]>=0){
            tempVal = tempVal + B[i];
        }else{
            tempLeft = i+2;
            tempVal = 0;
        }
        
        if(finalVal<tempVal){
            finalVal = tempVal;
            finalLeft = tempLeft;
            finalRight = i+1;
        }
    }
    *(len1+0)=finalLeft;
    *(len1+1)=finalRight;
    return len1;
}

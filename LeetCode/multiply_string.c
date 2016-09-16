char* multiply(char* num1, char* num2) {
    int len1=0,len2=0,i,j,n,index=0;
    char *s;
    int *arr;
    len1 = strlen(num1);
    len2 = strlen(num2);
    n = len1+len2;
    arr = (int *)malloc(sizeof(int )*n);
    for(i=0;i<n;i++){
       arr[i]=0; 
    }
    for(i=len1-1;i>=0;i--){
        for(j=len2-1;j>=0;j--){
            arr[j+i+1] = arr[j+i+1] + ((num1[i]-'0')*(num2[j]-'0'));
        }
    }
    for(i=n-1;i>0;i--){
        arr[i-1]=arr[i-1] + arr[i]/10;
        arr[i]=arr[i]%10;
    }
    s=(char *)malloc(sizeof(char)*n);
    *s='\0';
    i = 0;
    while(i < n){
        if(arr[i]==0 && *s=='\0'){
            i++;
        }else{
            s[index++] = arr[i++]+'0';
        }
    }
    if(*s=='\0'){
        s[0]='0';
        s[1]='\0';
    }else{
       s[index] = '\0';  
    }
   
    return s;
}
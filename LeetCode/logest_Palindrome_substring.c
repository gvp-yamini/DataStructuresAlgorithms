char* longestPalindrome(char* s) {
    int maxlen=1,start,len,i,low,high;
    char *result;
    len = strlen(s);
    if(s==NULL || len==1){
        return s;
    }
    for(i=1;i<len;i++){
        low = i-1;
        high = i;
        while(low>=0 && high<len && s[low]==s[high]){
            if((high-low+1)>maxlen){
                maxlen = high-low+1;
                start=low;
            }
            high++;
            low--;
        }
        low = i-1;
        high = i+1;
        while(low>=0 && high < len && s[low]==s[high]){
            if((high-low+1)>maxlen){
                maxlen = high-low+1;
                start = low;
            }
            high++;
            low--;
        }
    }
    result = (char *)malloc(sizeof(char)*(maxlen+1));
    for(i=0;i<maxlen;i++){
        result[i]= s[start];
        start++;
    }
    result[i]='\0';
    return result;
}
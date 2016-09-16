int titleToNumber(char* s) {
    int num = 0,i=0,m;
    while(s[i]!='\0'){
        m = (s[i] - 'A') + 1;
        num = num*26 + m;
        i++;
    }
    return num;
}
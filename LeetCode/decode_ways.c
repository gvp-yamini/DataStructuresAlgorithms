int numDecodings(char* s) {
    int i=0,num=0,combination=0;
    if(s[i]=='\0'){
        return 0;
    }
    if(s[i+1]=='\0'){
        num = s[i]-'0';
        if(num==0){
           return 0;
        }
        return 1;
    }
    if((s[i]-'0')==0){
        return 0;
    }
    while(s[i+1] !='\0'){
        num = (s[i]-'0')*10 + (s[i+1]-'0');
        if(num>10 && num<=26){
            combination = combination + 2;
        }else{
            if(num!=0){
            combination = combination + 1;
            }
          }
        i++;
    }
    return combination;
}
bool isVowel(char ch){
    if(ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u'||ch=='A'||ch=='E'||ch=='I'||ch=='O'||ch=='U'){
        return true;
    }
    return false;
}
char* reverseVowels(char* s) {
    int i,j,n;
    char temp;
    n=strlen(s);
    if(n==1 || s==NULL){
        return s;
    }
    i=0,j=n-1;
    while(i<j){
        while(!isVowel(s[i]) && i<j){
            i++;
        }
        while(!isVowel(s[j]) && i<j){
            j--;
        }
        if(i<j){
        temp = s[i];
        s[i]=s[j];
        s[j]=temp;
        }
        i++;
        j--;
    }
    return s;
}
char findTheDifference(char* s, char* t) {
    int word1 = (*s-'a');
    s++;
    if(*s=='\0' && *t=='\0'){
        return *s;
    }
    if(*s=='\0' && *t !='\0'){
        return *t;
    }
    while(*s!='\0'){
        word1 = word1^(*s-'a');
        s++;
    }
    while(*t!='\0'){
        word1 = word1^(*t-'a');
        t++;
    }
    char re = word1 + 'a';
    return re;
}
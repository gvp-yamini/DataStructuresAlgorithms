#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    char *str,*inputstr;
    inputstr = (char *)malloc(sizeof(char )*100);
    scanf("%s",inputstr);
    str = inputstr;
    int i=0;
    while(*str != '\0'){
    	if(*str>=65 && *str<=91){
    		*str = *str + 32;
    	}else{
    		*str = *str - 32;
    	}
    	str++;
    }
    printf("%s",inputstr);
    return 0;
}
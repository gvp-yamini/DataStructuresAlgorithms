char* addBinary(char* a, char* b) {
    int len1=0,len2=0,cSize = 0,i=0,j=0,carry=0,k,temp,num1,num2;
	char *c;
	while(a[i]!='\0'){
	  i++;
	}
	len1 = i;
	while(b[j]!='\0'){
	  j++;
	}
	len2 = j;
	cSize = len1>=len2?len1:len2;
	c = (char *)malloc(sizeof(char )*(cSize+1));
	i = len1-1;
	j = len2-1;
	k = cSize-1;
	c[cSize] = '\0';
	while(i>-1&&j>-1){
	    num1 = a[i]-'0';
	    num2 = b[j]-'0';
		temp = num1 + num2 + carry;
		if(temp==2){
			c[k]='0';
			carry=1;
		}else if(temp==3){
			c[k]='1';
			carry=1;
		}else{
			c[k]= temp+'0';
			carry = 0;
		}
		k--;
		i--;
		j--;
	}
	while(i>-1){
			temp = (a[i]-'0') + carry;
		    if(temp==2){
				c[k] = '0';
				carry = 1;
			}else{
				c[k] = temp+'0';
				carry = 0;
			}
			i--;
			k--;
	}
   	while(j>-1){
			temp = (b[j]-'0') + carry;
		    if(temp==2){
				c[k] = '0';
				carry = 1;
			}else{
				c[k] = temp+'0';
				carry = 0;
			}
			j--;
			k--;
	}
	if(carry==1){
		c[0] = '1';
	}else{
		c[0] = '0';
	}
	return c;
    
}
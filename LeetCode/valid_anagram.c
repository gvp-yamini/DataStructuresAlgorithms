bool isAnagram(char* s, char* t) {
    int len1=0,len2=0,i=0;
    while(s[len1]!='\0'){
        len1++;
    }
    while(t[len2]!='\0'){
        len2++;
    }
    sorting(s,0,len1-1);
    sorting(t,0,len2-1);
    while(s[i]!='\0'&&t[i]!='\0'){
        if(s[i]!=t[i]){
            return false;
            break;
        }
        i++;
    }
    if((s[i]!='\0'&&t[i]=='\0')||(s[i]=='\0'&&t[i]!='\0')){
        return false;
    }
    return true;
}

void sorting(char *arr,int left,int right){
	int pivot,i,j;
	char temp;
	if(left<right)
	{
		pivot = left;
	    i=left;
	    j=right;
	while(i<j){
		while((arr[i]<=arr[pivot])&&(i<right))
			i++;
		while((arr[pivot]<arr[j])&&(j>left))
			j--;
		if(i<j)
		{
			temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
	}
	temp = arr[pivot];
	arr[pivot]=arr[j];
	arr[j] = temp;
	sorting(arr,left,j-1);
	sorting(arr,j+1,right);
	}
}
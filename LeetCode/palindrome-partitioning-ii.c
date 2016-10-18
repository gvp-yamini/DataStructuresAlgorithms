int min(int a,int b){
   if(a<b){
       return a;
   } 
   return b;
}
int minCut(char* s) {
    int len = strlen(s);
        if(len==0){
            return 0;
        }
        int p[len][len];
        int c[len][len];
        
        for(int i=0;i<len;i++){
            p[i][i]=1;
            c[i][i]=0;
        }
        for(int l=2;l<=len;l++){
            for(int i=0;i<len-l+1;i++){
                int j=l+i-1;
                if(l==2){
                   if(s[i]==s[j]){
                       p[i][j]=1;
                   }
                }else{
                    if((s[i]==s[j]) && p[i+1][j-1]==1){
                       p[i][j]=1;
                   }
                }
                
                if(p[i][j]==1){
                    c[i][j]=0;
                }else{
                    c[i][j] = INT_MAX;
                    for(int k=i;k<=j-1;k++){
                       c[i][j]=min(c[i][j],c[i][k]+c[k+1][j]+1); 
                    }
                }
            }
        }
        return c[0][len-1];
}
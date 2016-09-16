int bulbSwitch(int n) {
    int i,count=0;
    if(n==1){
        return 1;
    }
    for(i=1;i<=n/2;i++){
     if(i*i <= n){
         count++;
     }else{
         break;
     }   
    }
    return count;
}
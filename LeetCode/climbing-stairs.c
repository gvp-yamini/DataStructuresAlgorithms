int climbStairs(int n) {
    return fib(n);
}

int fib(int n){
    int i=0;
    int *resultdp = (int *)malloc(sizeof(int)*(n+1));
    memset(resultdp,0,n+1);
    resultdp[0]=1;
    resultdp[1]=1;
    for(i=2;i<=n;i++){
        resultdp[i]=resultdp[i-1]+resultdp[i-2];
    }
    return resultdp[n];
}
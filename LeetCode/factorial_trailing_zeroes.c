int trailingZeroes(int n) {
    int count=0;
    long long i = 5;
    while(n>=i){
        count = count + n/i;
        i = i*5;
    }
    return count;
}
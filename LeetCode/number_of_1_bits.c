int hammingWeight(uint32_t n) {
    int count=0,ntimes=0;
    uint32_t mask=00000000000000000000000000000001;
    while(ntimes<32){
        if(n&mask){
            count++;
        }
        mask = mask<<1;
        ntimes++;
    }
    return count;
}
// Forward declaration of isBadVersion API.
bool isBadVersion(int version);

int firstBadVersion(int n) {
    int low=0,high=n;
    while(high-low>1){
        int mid = low + (high-low)/2;
        if(isBadVersion(mid)){
            high = mid;
        }else{
            low = mid;
        }
    }
    return high;
}

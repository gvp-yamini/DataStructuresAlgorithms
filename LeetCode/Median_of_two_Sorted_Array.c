int max(int a,int b){
    if(a>b){
        return a;
    }else{
        return b;
    }
}
int min(int a,int b){
    if(a<b){
        return a;
    }else{
        return b;
    }
}
double Median2Numbers(int a,int b){
    double mid;
    mid = (a+b)/2.0;
    return mid;
}
int Median3Numbers(int a,int b,int c){
    return a+b+c - max(a,max(b,c)) - min(a,min(b,c));
}
double Median4Numbers(int a,int b,int c,int d){
    int maxVal,minVal;
    double mid;
    maxVal = max(a,max(b,max(c,d)));
    minVal = min(a,min(b,min(c,d)));
    mid = a + b + c + d-maxVal-minVal;
    return mid/2.0;
}
double findMedian(int* nums1, int nums1Size, int* nums2, int nums2Size){
    int mid1,mid2;
    if(nums1Size==0 && nums2Size==0){
        return -1;
    }
    if(nums1Size==0 && (nums2Size&1)){
        return nums2[nums2Size/2];
    }
    if(nums1Size==0 && !(nums2Size&1)){
        return Median2Numbers(nums2[nums2Size/2],nums2[nums2Size/2 - 1]);
    }
    if(nums1Size==1){
        if(nums2Size==1){
            return Median2Numbers(nums1[0],nums2[0]);
        }
        if(nums2Size&1){
            return Median2Numbers(nums2[nums2Size/2],Median3Numbers(nums2[nums2Size/2-1],nums1[0],nums2[nums2Size/2+1]));
        }
        
        return Median3Numbers(nums2[nums2Size/2-1],nums2[nums2Size/2],nums1[0]);
    }
    if(nums1Size==2){
        if(nums2Size==2){
            return Median4Numbers(nums1[0],nums1[1],nums2[0],nums2[1]);
        }
        if(nums2Size&1){
            return Median3Numbers(nums2[nums2Size/2],max(nums1[0],nums2[nums2Size/2-1]),min(nums1[1],nums2[nums2Size/2+1]));
        }
        
        return Median4Numbers(nums2[nums2Size/2],nums2[nums2Size/2-1] ,max(nums1[0],nums2[nums2Size/2-2]),min(nums1[1],nums2[nums2Size/2+1]));
    }
    
    mid1 = (nums1Size-1)/2;
    mid2 = (nums2Size-1)/2;
    if(nums1[mid1]<nums2[mid2]){
        return findMedian(nums1+mid1,nums1Size/2+1,nums2,nums2Size-mid1);
    }
    return findMedian(nums1,nums1Size/2+1,nums2+mid1,nums2Size-mid1);
}

double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {
    if(nums1Size<nums2Size){
       return findMedian(nums1,nums1Size,nums2,nums2Size);
    }else{
       return findMedian(nums2,nums2Size,nums1,nums1Size);
    }
}
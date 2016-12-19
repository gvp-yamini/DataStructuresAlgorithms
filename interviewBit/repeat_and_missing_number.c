You are given a read only array of n integers from 1 to n.

Each integer appears exactly once except A which appears twice and B which is missing.

Return A and B.

Note: Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

Note that in your output A should precede B.

Example:

Input:[3 1 2 5 3] 

Output:[3, 4] 

A = 3, B = 4



/**
 * @input A : Read only ( DON'T MODIFY ) Integer array
 * @input n1 : Integer array's ( A ) length
 * 
 * @Output Integer array. You need to malloc memory for result array, and fill result's length in length_of_array
 */
int* repeatedNumber(const int* A, int n1, int *length_of_array) {
	// SAMPLE CODE
        /*
         * *length_of_array = 2; // length of result array
         * int *result = (int *) malloc(*length_of_array * sizeof(int));
         * // DO STUFF HERE
         * return result;
         */
         int sum=A[0];
         *length_of_array = 2;
         int x=0,y=0;
         int i=0;
         int *result = (int *)malloc(sizeof(int)*2);
         int xVal=0;
         for(i=1;i<n1;i++){
             sum = sum^A[i];
         }
         for(i=1;i<=n1;i++){
             sum = sum^i;
         }
         
         int setBitRight= sum & ~(sum-1);
         for(i=0;i<n1;i++){
             if(A[i]&setBitRight){
                 x=x^A[i];
             }else{
                 y=y^A[i];
             }
         }
         for(i=1;i<=n1;i++){
             if(i&setBitRight){
                 x=x^i;
             }else{
                 y=y^i;
             }
         }
         result[0]=x;
         result[1]=y;
         
         return result;
}

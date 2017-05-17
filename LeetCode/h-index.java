public class Solution {
    public int hIndex(int[] citations) {
        int len  = citations.length;
		int hindex = 0;
		int[] countingSort = new int[len+1];
		
		for(int i=0;i<len;i++){
			if(citations[i]>=len){
				countingSort[len]++;
			}else{
				countingSort[citations[i]]++;
			}
		}
		int total = 0;
		for(int j = len;j>=0;j--){
			total = total + countingSort[j];
			if(total>=j){
				return j;
			}
		}
		
		
		return hindex;
    }
}
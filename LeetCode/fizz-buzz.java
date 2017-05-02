public class Solution {
    public List<String> fizzBuzz(int n) {
       int i=0;
       List<String> res = new ArrayList<String>();
       while(i<n){
		   if((i+1)%3==0 && (i+1)%5==0){
			   res.add("FizzBuzz");
		   }else if((i+1)%3 ==0){
			   res.add("Fizz");
		   }else if((i+1)%5 ==0){
			   res.add("Buzz");
		   }else{
			   res.add(""+(i+1));
		   }
		   i++;
       }
       return res;	   
    }
}
public class Solution {
    public String convertToBase7(int num) {
		StringBuffer buffer1 = new StringBuffer();
		int flag = 0;
		if(num==0){
		    return "0";
		}
		if(num<0){
		    num = -1*num;
		    flag=1;
		}
		while(num!=0){
			buffer1.append(num%7 + "");
			num = num/7;
		}
		if(flag==1){
		    return buffer1.append("-").reverse().toString();
		}else{
		  return buffer1.reverse().toString();
		}
    }
}
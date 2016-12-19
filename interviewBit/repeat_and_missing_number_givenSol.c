InterviewBit Beta


Search for problems, users or companies

 Chat
 Puzzles
 3435
 71
Yamini 
Programming Arrays Repeat And Missing Number Array
Repeat and Missing Number ArrayBookmark Suggest Edit
Please Note:

There are certain problems which are asked in the interview to also check how you take care of overflows in your problem.
This is one of those problems.
Please take extra care to make sure that you are type-casting your ints to long properly and at all places. Try to verify if your solution works if number of elements is as large as 105

 Food for thought : 
* Even though it might not be required in this problem, in some cases, you might be required to order the operations cleverly so that the numbers do not overflow. 
For example, if you need to calculate n! / k! where n! is factorial(n), one approach is to calculate factorial(n), factorial(k) and then divide them. 
Another approach is to only multiple numbers from k + 1 ... n to calculate the result. 
Obviously approach 1 is more susceptible to overflows. 
You are given a read only array of n integers from 1 to n.

Each integer appears exactly once except A which appears twice and B which is missing.

Return A and B.

Note: Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

Note that in your output A should precede B.

Example:

Input:[3 1 2 5 3] 

Output:[3, 4] 

A = 3, B = 4
See Expected Output
NotesAll Notes


 01 : 20 : 26 Current Possible Score: 0  Max Score: 350 
Correct Answer. You got 170/350 points!
All hints are now accessible without any penalty.
Solution discussion thread has been unlocked below.
Topic Completed
Congratulations! You have achieved your daily score goal.
Next you should proceed to topic Math
Seek Help  


1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
public class Solution {
    // DO NOT MODIFY THE LIST
    public ArrayList<Integer> repeatedNumber(final List<Integer> a) {
        int len = a.size();
        int[] x = new int[len+1];
        ArrayList<Integer> result = new ArrayList<Integer>();
        int i=0;
        for(i=0;i<len;i++){
         if(x[a.get(i)]==1)
            result.add(a.get(i));
        else
            x[a.get(i)]=1;
         }
         for(i=1;i<=len;i++)
          {
          if(x[i]==0)
            {
            result.add(i);
            }
        }
        return result;
    }
}
SaveReset  SubmitTestToggle Dropdown
Hints
Hint 1
Hint 2
Solution Approach
Complete Solution
Similar Problems
Hotel Bookings Possible
Pascal Triangle Rows
7728 successful submissions.
Friends who solved this
Turn on Social Sharing in Settings
Asked In:
Amazon
Problem Discussion
Solution Discussion
This thread is for people who have not yet solved the problem. Please do not post solutions here. 
About Us FAQ Contact Us Terms Privacy Policy
System Design Questions Google Interview Questions Facebook Interview Questions Amazon Interview Questions Microsoft Interview Questions
 Like Us   Follow Us   Email
 We are in beta! We would love to hear your feedback.  Loved InterviewBit? Write us a testimonial.
×Close
Access Hint
C
C++
Java
Python
JS
 NOTE : This is user generated solution and not an editorial solution 
void finalin(int arr[], int n, int *x, int *y)
{
  int xor1; 
  int set_bit_no; 
  int i;
  *x = 0;
  *y = 0;
 
  xor1 = arr[0];
 
  
  for(i = 1; i < n; i++)
     xor1 = xor1^arr[i];
 
 
  for(i = 1; i <= n; i++)
     xor1 = xor1^i;
 
  
  set_bit_no = xor1 & ~(xor1-1);
 
  
  for(i = 0; i < n; i++)
  {
    if(arr[i] & set_bit_no)
     *x = *x ^ arr[i]; 
    else
     *y = *y ^ arr[i]; 
  }
  for(i = 1; i <= n; i++)
  {
    if(i & set_bit_no)
     *x = *x ^ i; 
    else
     *y = *y ^ i; 
  }
 for(i = 0; i < n; i++)
  {
    if(*y==arr[i]) {
        return;
    } 
  }
  int temp;
  temp = *x;
  *x = *y;
  *y = temp;
 
}

int* repeatedNumber(const int* A, int n1, int *length_of_array) {
	// SAMPLE CODE
        
          *length_of_array = 2; // length of result array
          int *result = (int *) malloc(*length_of_array * sizeof(int));
          // DO STUFF HERE
          int *x=(int*)malloc(sizeof(int));
          int *y=(int*)malloc(sizeof(int));
          finalin(A,n1,x,y);
          result[0]=*y;
          result[1]=*x;
          return result;
         
}
Close

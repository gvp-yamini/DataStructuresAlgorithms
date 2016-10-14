class MyQueue {
    
    private Stack<Integer> st1 = new Stack<Integer>();
    private Stack<Integer> st2 = new Stack<Integer>();
    
    // Push element x to the back of queue.
    public void push(int x) {
        st1.push(x);
    }

    // Removes the element from in front of queue.
    public void pop() {
        if(!st2.isEmpty()){
            st2.pop();
        }else{
        while(!st1.isEmpty()){
            int val = st1.pop();
            st2.push(val);
        }
        st2.pop();
      }

    }

    // Get the front element.
    public int peek() {
         if(!st2.isEmpty()){
            return st2.peek();
        }else{
        while(!st1.isEmpty()){
            int val = st1.pop();
            st2.push(val);
        }
        return st2.peek();
      }
    }

    // Return whether the queue is empty.
    public boolean empty() {
        if(st2.isEmpty() && st1.isEmpty()){
            return true;
        }
        return false;
    }
}
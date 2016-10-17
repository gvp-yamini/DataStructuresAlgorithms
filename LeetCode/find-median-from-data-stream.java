public class MedianFinder {
    PriorityQueue<Integer> maxHeap;
    PriorityQueue<Integer> minHeap;
    
    public MedianFinder(){
        maxHeap = new PriorityQueue<Integer>(Collections.reverseOrder());
        minHeap = new PriorityQueue<Integer>();
    }
    
    // Adds a number into the data structure.
    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());
        if(minHeap.size()>maxHeap.size()){
            maxHeap.offer(minHeap.poll());
        }
    }

    // Returns the median of current data stream
    public double findMedian() {
        if(maxHeap.size()==minHeap.size()){
            return (double)(minHeap.peek()+maxHeap.peek())/2;
        }else{
            return maxHeap.peek();
        }
    }
};

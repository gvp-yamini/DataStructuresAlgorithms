package linkedList;
import java.util.Scanner;

public class LinkedList {

	/**
	 * @param args
	 */
	protected int inputVal;
	Scanner scan = new Scanner(System.in);
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}

class Node{
	protected int data;
	protected Node link;
	
	public Node(){
		data = 0;
		link = null;
	}
	public Node(int val,Node n){
		data = val;
		link = n;
	}
	public Node getNext(){
		return link;
	}
	public void setNext(Node n){
		link = n;
	}
	public int getData(){
		return data;
	}
	public void setData(int val){
		data = val;
	}
}
class LinkedListOperations{
	protected Node start;
	protected Node end;
	protected int size;
	public LinkedListOperations(){
		start = null;
		end = null;
		size = 0;
	}
	public void insertAtStart(int val){
		Node temp = new Node(val,null);
		size++;
		if(start == null){
			start = temp;
			end = start;
		}else{
			temp.setNext(start);
			start = temp;
		}
		return;
	}
	public void insertAtEnd(int val){
		Node temp = new Node(val,null);
		size++;
		if(start==null){
			start = temp;
			end = start;
		}else{
			end.setNext(temp);
			end = temp;
		}
		return;
	}
	public void insertAtPos(int pos,int val){
		int i;
		Node temp = new Node(val,null);
		Node currPtr=start;
		Node prevPtr=start;
		for(i=0;i<size;i++){
			if(pos==i){
				prevPtr.setNext(temp);
				temp.setNext(currPtr);
				size++;
				break;
			}else{
				prevPtr = currPtr;
				currPtr = currPtr.getNext();
			}
		}
		return;
	}
	public void deleteAtStart(){
		if(start==null){
			return;
		}else{
			start = start.getNext();
			size--;
		}
		return;
	}
	public void deleteAtEnd(){
		Node temp=start;
		while(temp.getNext()!=end){
			temp = temp.getNext();
		}
		end = temp;
		size--;
		return;
	}
	public void deleteAtPos(int pos){
		int i;
		pos = pos - 1;
		Node tempNext=null,temp=start;
		for(i=0;i<size;i++){
			if(pos==i){
				tempNext = temp.getNext().getNext();
				temp.setNext(tempNext);
				size--;
				break;
			}else{
				temp = temp.getNext();
			}
		}
		return;
	}
}

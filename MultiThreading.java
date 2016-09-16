package linkedList;

import java.lang.*;

public class MultiThreading extends Thread{

	/**
	 * @param args
	 */
	public void run(){
		System.out.println("running....");
		for(int i=0;i<5;i++){
			try{
		      Thread.sleep(500);
			}catch(InterruptedException e){
				System.out.println(e);
			}
			System.out.println(i);
		}
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		MultiThreading m1 = new MultiThreading();
		MultiThreading m2 =  new MultiThreading();
		MultiThreading m3 = new MultiThreading();
		m1.setDaemon(true);
		m1.start();
		try{
			m1.join();
		}catch(Exception e){
			System.out.println(e);
		}
		System.out.println(m1.getName());
		m1.setName("My name is yamini");
		System.out.println(m1.getName());
		m2.start();
		m3.start();
	}

}

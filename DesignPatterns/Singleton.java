package linkedList;

public class Singleton {
	private int value;
	private static Singleton s;
	
	private Singleton(){
		value = 0;
		s = null;
	}
    
	public int get(){
		return value;
	}
	
	public void set(int value){
		this.value = value;
	}
	public void increment(){
		value = value+1;
	}
	public void decrement(){
		value = value - 1;
	}
	public static Singleton getInstance(){
		if(s==null){
			s = new Singleton();
		}
		return s;
	}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Singleton p;
		p = Singleton.getInstance();
		System.out.println(p.get());
		p.increment();
		System.out.println(p.get());
	}

}

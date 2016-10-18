package linkedList;
import java.io.*;

class Student implements Serializable{
	public String name;
	public int number;
	Student(String name,int number){
		this.name = name;
		this.number = number;
	}
}

public class Serialize{

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception{
		// TODO Auto-generated method stub
		try{
	    Student st = new Student("yamini",1);
		FileOutputStream fout = new FileOutputStream("fout.ser");
		ObjectOutputStream out = new ObjectOutputStream(fout);
        out.writeObject(st);
        out.flush();
        FileInputStream fin = new FileInputStream("fout.ser");
        ObjectInputStream in = new ObjectInputStream(fin);
        Student s = (Student)in.readObject();
        in.close();
        System.out.println(s.name+"-->"+s.number);
        System.out.println("success");
		}catch(Exception e){
			System.out.println(e);
		}
	}

}

package linkedList;

public class JobSequencing {
    Job jb[];
	class Job{
		String name;
		int deadline;
		int profit;

	}
	JobSequencing(int n){
		jb = new Job[n];
		for(int i=0;i<5;i++){
			jb[i]=new Job();
		}
	}
	/**
	 * @param args
	 */
	public int min(int a,int b){
		if(a>b){
			return b;
		}
		return a;
	}
	public void printJobsequences(){
		int result[]=new int[5];
		int slots[] = new int[5];
		
		for(int i=0;i<5;i++){
			for(int j=min(5,jb[i].deadline)-1;j>=0;j--){
				if(slots[j]==0){
					slots[j]=1;
					result[j]=i;
					break;
				}
			}
		}
		for(int i=0;i<5;i++){
			System.out.println(jb[result[i]].name);
		}
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		JobSequencing n = new JobSequencing(5);
		n.jb[0].name = "a";
		n.jb[0].deadline = 2;
		n.jb[0].profit = 100;
		
		n.jb[1].name = "c";
		n.jb[1].deadline = 2;
		n.jb[1].profit = 27;
		
		n.jb[2].name = "d";
		n.jb[2].deadline = 1;
		n.jb[2].profit = 25;
		
		n.jb[3].name = "b";
		n.jb[3].deadline = 1;
		n.jb[3].profit = 19;
		
		n.jb[4].name = "e";
		n.jb[4].deadline = 3;
		n.jb[4].profit = 15;
		n.printJobsequences();
	}

}

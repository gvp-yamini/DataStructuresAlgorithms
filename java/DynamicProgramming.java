package linkedList;

public class DynamicProgramming {

	/**
	 * @param args
	 */
	public int numSquares(int n) {
        int[] fewest = new int[n + 1];
        fewest[0] = 0;
        int min;
        for (int i = 1; i <= n; i++) {
            min = i;
            for (int m = 1; m * m <= i; m++) {
                min = Math.min(min, 1 + fewest[i - m * m]);
            }
            fewest[i] = min;
        }
        return fewest[n];
    }
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		DynamicProgramming dp = new DynamicProgramming();
		System.out.println(dp.numSquares(12));
	}

}

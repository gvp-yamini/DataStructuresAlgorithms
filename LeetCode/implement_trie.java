class TrieNode {
    // Initialize your data structure here.
	boolean isLeaf;
	TrieNode[] children;
		
    public TrieNode() {
        this.children = new TrieNode[26];
    }
}

public class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    // Inserts a word into the trie.
    public void insert(String word) {
		TrieNode p = root;
		int index;
		int len = word.length();
		for(int i=0;i<len;i++){
			index = word.charAt(i)-'a';
			if(p.children[index]==null){
				TrieNode temp = new TrieNode();
				p.children[index] = temp;
				p = temp;
			}else{
			    p = p.children[index];
			}
		}
		p.isLeaf = true;
    }

    // Returns if the word is in the trie.
    public boolean search(String word) {
        TrieNode p = root;
		int index;
		int len = word.length();
		for(int i=0;i<len;i++){
			index = word.charAt(i)-'a';
			if(p.children[index]==null){
				return false;
			}else{
				p = p.children[index];
			}
		}
		if(p.isLeaf){
			return true;
		}
		return false;
    }

    // Returns if there is any word in the trie
    // that starts with the given prefix.
    public boolean startsWith(String prefix) {
        TrieNode p = root;
		int index;
		int len = prefix.length();
		for(int i=0;i<len;i++){
			index = prefix.charAt(i)-'a';
			if(p.children[index]==null){
				return false;
			}else{
				p = p.children[index];
			}
		}
		if(p==root){
			return false;
		}
		return true;
    }
}

// Your Trie object will be instantiated and called as such:
// Trie trie = new Trie();
// trie.insert("somestring");
// trie.search("key");
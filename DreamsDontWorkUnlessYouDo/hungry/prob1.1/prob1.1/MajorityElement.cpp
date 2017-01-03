struct node{
    int value;
    int count;
    struct node *left,*right;
}; 
struct node * createBinaryTree(int ,struct node *);
int searchMajority(struct node *,int );
int majorityElement(int* nums, int numsSize) {
    struct node *head = NULL;
    int i=0,majority=0;
    for(i=0;i<numsSize;i++){
        head = createBinaryTree(nums[i],head);
    }
    majority = searchMajority(head,numsSize);
    return majority;
}

int searchMajority(struct node *head,int n){
    if(head){
        if(head->count>n/2){
            return head->value;
        }
        searchMajority(head->left,n);
        searchMajority(head->right,n);
    }
}

struct node * createBinaryTree(int val,struct node *head){
    if(head==NULL){
        head = (struct node *)malloc(sizeof(struct node));
        head->value = val;
        head->count = 0;
        head->left = NULL;
        head->right = NULL;
    }else if(head->value == val){
        (head->count)++;
    }else if(head->value>=val){
        head->left = createBinaryTree(val,head->left);
    }else{
        head->right = createBinaryTree(val,head->right);
    }
    return head;
}
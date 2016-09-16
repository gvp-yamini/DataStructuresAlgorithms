/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
 struct TreeNode* constructBST(struct ListNode **head_ref,int start,int end);
struct TreeNode* sortedListToBST(struct ListNode* head) {
    int n=0;
    struct ListNode* temp = head;
    while(temp){
        temp = temp->next;
        n++;
    }
  return constructBST(&head,0,n-1);
}

struct TreeNode* constructBST(struct ListNode **head_ref,int start,int end){
    if(start>end){
        return NULL;
    }
    int mid = start + (end-start)/2;
    struct TreeNode *left = constructBST(head_ref,start,mid-1);
    struct TreeNode *root = (struct TreeNode *)malloc(sizeof(struct TreeNode));
    root->val = (*head_ref)->val;
    root->left = left;
    *head_ref = (*head_ref)->next;
    root->right = constructBST(head_ref,mid+1,end);
    return root;
}
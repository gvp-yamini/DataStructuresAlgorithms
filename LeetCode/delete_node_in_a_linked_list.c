/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
void deleteNode(struct ListNode* node) {
    struct ListNode* temp;
    while(node->next!=NULL){
        node->val = node->next->val;
        temp = node;
        node=node->next;
    }
    temp->next = NULL;
    free(node);
}
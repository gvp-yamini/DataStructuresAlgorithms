#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "malloc.h"

struct ListNode {
     int val;
     struct ListNode *next;
  };
bool hasCycle(struct ListNode *); 
void main(){
 struct ListNode *head = NULL;
 head = (struct ListNode *)malloc(sizeof(struct ListNode));
 head->val = 1;
 head->next = NULL;
 if(hasCycle(head)){
	 printf("cyclic\n");
 }else{
	 printf("non cyclic\n");
 }
 getch();
}

bool hasCycle(struct ListNode *head) {
    struct ListNode *p=NULL,*q=NULL;
    p=head;
    q=head;
    while(q && p && p->next){
            q = q->next;
            p = p->next->next;
        if(q==p){
            return true;
        }
    }
    return false;
}
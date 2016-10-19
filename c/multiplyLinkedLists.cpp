#include "stdafx.h"
#include "stdio.h"
#include "conio.h"
#include "stdlib.h"

struct node{
	int val;
	struct node *next;
};

struct node *createList(){
	struct node *num1=NULL,*temp=NULL,*curr=NULL;
	int data=0;
	while(1){
		scanf("%d",&data);
		if(data==-1){
			break;
		}
		temp = (struct node *)malloc(sizeof(struct node));
		temp->val = data;
		temp->next = NULL;
		if(num1==NULL){
			num1 = temp;
			curr = temp;
		}else{
			curr->next = temp;
			curr = curr->next;
		}
	}
	return num1;
}

void printList(struct node *head){
	struct node *temp;
	temp = head;
	while(temp){
		printf("%d-->",temp->val);
		temp = temp->next;
	}
	printf("\n");
}

struct node *addList(struct node *mul1,struct node *mul2){
	struct node *result=NULL,*tnode=NULL,*tnodeTemp=NULL;
	int sum=0,carry=0,n=0;
	while(mul1 || mul2){
		sum=0;
		if(mul1){
			sum = sum + mul1->val;
			mul1 = mul1->next;
		}
		if(mul2){
			sum = sum + mul2->val;
			mul2 = mul2->next;
		}
		sum = sum + carry;
		if(sum>9){
			n = sum%10;
			carry = sum/10;
		}else{
			n = sum;
			carry=0;
		}
		tnode = (struct node *)malloc(sizeof(struct node));
		tnode->val = n;
		tnode->next = NULL;
		if(result==NULL){
			result = tnode;
			tnodeTemp = tnode;
		}else{
			tnodeTemp->next = tnode;
			tnodeTemp = tnodeTemp->next;
		}
	}
	if(carry!=0){
		tnode = (struct node *)malloc(sizeof(struct node));
		tnode->val = carry;
		tnode->next = NULL;
		tnodeTemp->next = tnode;
	}
	return result;
}
struct node *multiplytwoList(struct node *num1,struct node *num2){
	struct node *mul1=NULL,*mul2=NULL,*temp1=num1,*temp2=num2,*tnode,*tnodeTemp;
	int value = temp2->val;
	int gap = 0;
	temp2 = temp2->next;
	int carry = 0;
	int sum=0,n;
	while(temp1){
		sum = (temp1->val)*value + carry;
		if(sum>9){
			n = sum%10;
			carry = sum/10;
		}else{
			n = sum;
			carry = 0;
		}
		tnode = (struct node *)malloc(sizeof(struct node));
		tnode->val = n;
		tnode->next = NULL;
		if(mul1==NULL){
			mul1=tnode;
			tnodeTemp = tnode;
		}else{
			tnodeTemp->next = tnode;
			tnodeTemp = tnodeTemp->next;
		}
		temp1=temp1->next;
	}
	if(carry!=0){
		tnode = (struct node *)malloc(sizeof(struct node));
		tnode->val = carry;
		tnode->next = NULL;
		tnodeTemp->next = tnode;
	}
    gap = 1;
	carry = 0;
	sum=0;
	while(temp2){
		int k = gap;
		while(k){
			tnode = (struct node *)malloc(sizeof(struct node));
		    tnode->val = 0;
		    tnode->next = NULL;
			if(mul2==NULL){
               mul2 = tnode;
			   tnodeTemp = tnode;
			}else{
				tnodeTemp->next = tnode;
				tnodeTemp = tnodeTemp->next;
			}
			k--;
		}
		value = temp2->val;
		temp1=num1;
		while(temp1){
		sum = (temp1->val)*value + carry;
		if(sum>9){
			n = sum%10;
			carry = sum/10;
		}else{
			n = sum;
			carry = 0;
		}
		tnode = (struct node *)malloc(sizeof(struct node));
		tnode->val = n;
		tnode->next = NULL;
		tnodeTemp->next = tnode;
		tnodeTemp = tnodeTemp->next;
		temp1=temp1->next;
		}
		if(carry!=0){
		tnode = (struct node *)malloc(sizeof(struct node));
		tnode->val = carry;
		tnode->next = NULL;
		tnodeTemp->next = tnode;
	}
		gap++;
		temp2= temp2->next;
		mul1 = addList(mul1,mul2);
	}
	return mul1;
}

void reverse(struct node *num1,struct node **head){
	if(num1->next==NULL){
	    *head = num1;
		 return;
	}
	reverse(num1->next,head);
	struct node * q = num1->next;
	q->next = num1;
	num1->next = NULL;
}
int main(){
	struct node *num1,*num2,*result,*head1,*head2;
	printf("insert list1\n");
	num1 = createList();
	printList(num1);
	printf("insert list2\n");
	num2 = createList();
	printList(num2);
	reverse(num1,&head1);
	printf("reverse list1\n");
	printList(head1);
	reverse(num2,&head2);
	printf("reverse list2\n");
	printList(head2);
	result = multiplytwoList(head1,head2);
	printf("after multiplication\n");
	printList(result);
	getch();
	return 0;
}
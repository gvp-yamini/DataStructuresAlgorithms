#include "stdafx.h"
#include "conio.h"
#include "stdio.h"
#include "malloc.h"

typedef struct node{
    int elementVal;
	struct  node *next;
} MinStack;
MinStack* minStackCreate(MinStack *stack, int maxSize);
void minStackPush(MinStack *stack, int element);
void minStackPop(MinStack *stack);
int minStackTop(MinStack *stack);
int minStackGetMin(MinStack *stack);
void minStackDestroy(MinStack *stack);
void main(){
	int mini;
	MinStack *head=NULL;
	head=minStackCreate(head,10);
	minStackPush(head,-3);
	mini=minStackGetMin(head);
	printf("%d",mini);
	getch();
}

MinStack* minStackCreate(MinStack *stack, int maxSize) {
    stack = (MinStack *)malloc(sizeof(MinStack)*maxSize);
	return stack;
}

void minStackPush(MinStack *stack, int element) {
    while(stack){
	 stack = stack->next;
	}
	stack->elementVal = element;
	stack->next = NULL;
}

void minStackPop(MinStack *stack) {
    while(stack->next->next){
	 stack = stack->next;
	}
	stack->next = NULL;
}

int minStackTop(MinStack *stack) {
    while(stack->next){
	   stack = stack->next;
	}
	return stack->elementVal;
}

int minStackGetMin(MinStack *stack) {
    int min=0;
	while(stack){
		if(min>stack->elementVal){
			min = stack->elementVal;
		}
		stack=stack->next;
	}
	return min;
}

void minStackDestroy(MinStack *stack) {
    free(stack);
}
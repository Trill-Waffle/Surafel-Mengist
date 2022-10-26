#include <stdio.h>

struct ItemNode {
	char * name; 
	struct ItemNode * next;
};

void addItem(struct ItemNode * item, struct ItemNode ** head);

void rmItem (struct ItemNode * item, struct ItemNode ** head);

void printList(struct ItemNode *item);

int exists(struct ItemNode * head, char * item);

struct ItemNode* get(struct ItemNode * head, char * name);

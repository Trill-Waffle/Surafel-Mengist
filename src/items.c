#include "items.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
void addItem(struct ItemNode * item, struct ItemNode ** head) {
	//printf("%s \n ", item->name);
	
	if(*head == NULL) {
		*head = item;
		//printf("%s",head->name);
	}
	
	else {
        	struct ItemNode * iterator = *head;
		struct ItemNode * test = iterator->next;
        	while(iterator->next != NULL) {
                	iterator = iterator->next;
        	}
        	iterator->next  = item;
		//(*head)->next = item;
		//(*head) = item;
	}


}
    
void rmItem (struct ItemNode * item, struct ItemNode ** head)
{
	if ((*head)->next == NULL) {
		//printf("Only item\n");
		*head = NULL;
	}
	else if(*head == item) {
		//printf("Head = item\n");
		*head = (*head)->next;
	}
	else{
		//printf("else\n");
		struct ItemNode * iterator = *head;
		while(iterator->next != item) {
			iterator = iterator->next;
		}
		iterator->next  = (iterator->next)->next;
	}
}

void printList(struct ItemNode *item) {
	struct ItemNode * iterator = item;
	while (iterator  != NULL) {
                printf("%s\t",iterator->name);
                iterator = iterator->next;
        }
        printf("\n");
}

int exists(struct ItemNode * head, char * item) {
	int e = 0;
        struct ItemNode * iterator = head;
        while (iterator  != NULL) {
		//printf("%s  %s",iterator->name, item);
                if(strcmp(iterator->name, item) == 0){e = 1;}
                iterator = iterator->next;
        }

	return e;
}

struct ItemNode* get(struct ItemNode * head, char * name) {
        //struct ItemNode * iterator = head;
	struct ItemNode * iterator = (struct ItemNode*)malloc(sizeof(struct ItemNode));
	iterator = head;	
        while (iterator  != NULL) {
                if(strcmp(iterator->name, name) == 0){return iterator;}
                iterator = iterator->next;
        }

        return iterator;

}


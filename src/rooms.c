#include "rooms.h"
#include "items.h"
#include <string.h>
struct Room createRoom(char* name) {
	struct Room newRoom;
	newRoom.name = name;
        newRoom.North = NULL;
        newRoom.South = NULL;
        newRoom.East = NULL;
        newRoom.West = NULL;
	newRoom.itemList = NULL;
	newRoom.characters = NULL;

        return  newRoom;
}

void setN(struct Room* cur, struct Room* north,struct Room* south,struct Room* east,struct Room* west){
	cur->North = north;
        cur->South = south;
        cur->East = east;
        cur->West = west;
}

void printRoom(struct Room r) {
	printf("Name:%s\tNorth: ", r.name);
	(r.North == NULL) ? printf("Null\t") : printf("%s\t", r.North->name);

        printf("South: ");
        (r.South == NULL) ? printf("Null\t") : printf("%s\t", r.South->name);

        printf("East: ");
        (r.East == NULL) ? printf("Null\t") : printf("%s\t", r.East->name);

        printf("West: ");
        (r.West == NULL) ? printf("Null\n") : printf("%s\n", r.West->name);

	printf("Items: ");
	printList(r.itemList);

	printf("Characters: ");
	printList(r.characters);

	printf("\n");
}

void addChar(char * name, struct Room * r) {
	/*int idx = 0;
	while (strcmp(*((r->characters)[idx])," ") != 0) {
		idx++;
	}
	(r->characters)[idx] = &name;*/
}

void rmChar(char * name, struct Room * r);

int isChar(char * name, struct Room * r);


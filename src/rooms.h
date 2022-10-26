#include <stdio.h>

struct Room {
   char * name;
   struct Room * North;
   struct Room * South;
   struct Room * East;
   struct Room * West;
   struct ItemNode * itemList;
   struct ItemNode * characters;
};

struct Room createRoom(char* name);

void setN(struct Room* cur, struct Room* north,struct Room* south,struct Room* east,struct Room* west);

void printRoom(struct Room r);

void addChar(char * name, struct Room * r);

void rmChar(char * name, struct Room * r);

int isChar(char * name, struct Room * r);



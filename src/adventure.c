#include <stdio.h>
#include "rooms.h"
#include "items.h"
#include <stdlib.h>
#include <time.h>
#include <string.h>

int check(char * sub, int flag);
//Globals
char characters[5][12] = {"Daniel", "Surafel","Lebron","James","Marc"};
char items[6][12] = {"Basketball", "Chalk","Imagination", "Goblet","Axe","Burger"};
int main() {
	//Arrays Containing the room structs and their names and arrays for character names and items
	struct Room rooms[9];
	char   roomNames[9][12] = {"Dorm", "Kitchen", "Bathroom" , "Library", "Study","Pantry", "Closet","Living Room" ,"Lounge"};
	//char   characters[5][10] = {"Daniel,", "Surafel","Lebron","James","Marc"};
	//char items[6][12] = {"Basketball", "Chalk","Imagination", "Goblet","Axe","Burger"};

	//Populate rooms area with Room Structs
	for(int i = 0; i < 9; i++) {
		rooms[i] = createRoom(roomNames[i]);

	}
	//Fisher Yates Shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle Modern Algorithm Section
	srand(time(0));
	//int rand[9] = {0,1,3,4,5,6,7,8};
	for (int i = 8; i > 0; i--)
	{
		int r = rand() % (i + 1) ; //https://www.geeksforgeeks.org/generating-random-number-range-c/
		struct Room temp = rooms[r];
		rooms[r] = rooms[i];
		rooms[i] = temp;
	}

	//Testing they are randomized and printing board
	/*for(int i = 0; i < 9; i++) {
		printf("%s          ",rooms[i].name);
		if (i % 3 ==2) {printf("\n");}
	}*/

	//Set pointers for each room 0 is top left 8 is bottom right of board
	//              North   South      East      West
	setN(&rooms[0], NULL, &rooms[3], &rooms[1], NULL);
        setN(&rooms[1], NULL, &rooms[4], &rooms[2], &rooms[0]);
        setN(&rooms[2], NULL, &rooms[5], NULL, &rooms[1]);

        setN(&rooms[3], &rooms[0] , &rooms[6], &rooms[4], NULL);
        setN(&rooms[4], &rooms[1] , &rooms[7], &rooms[5], &rooms[3]);
        setN(&rooms[5], &rooms[2] , &rooms[8], NULL, &rooms[4]);

        setN(&rooms[6], &rooms[3], NULL, &rooms[7], NULL);
        setN(&rooms[7], &rooms[4], NULL, &rooms[8], &rooms[6]);
        setN(&rooms[8], &rooms[5], NULL, NULL, &rooms[7]);
	//Testing All Pointers Assigned Properly
	//for(int i = 0; i < 9; i++) {printRoom(rooms[i]);}

	//Randomizing the items and assigning them to rooms
	int nums[9] = {0,1,2,3,4,5,6,7,8};
	for (int i = 9; i > 0; i--) {
		int r = rand() % (i + 1) ; 
		int temp = nums[r];
                nums[r] = nums[i];
                nums[i] = temp;
	}

	//Using the indexs to add items to rooms
	struct ItemNode item1 = {items[0], NULL};
	addItem(&item1, &(rooms[nums[0]].itemList));

        struct ItemNode item2 = {items[1], NULL};
        addItem(&item2, &(rooms[nums[1]].itemList));

        struct ItemNode item3 = {items[2], NULL};
        addItem(&item3, &(rooms[nums[2]].itemList));

        struct ItemNode item4 = {items[3], NULL};
        addItem(&item4, &(rooms[nums[3]].itemList));

        struct ItemNode item5 = {items[4], NULL};
        addItem(&item5, &(rooms[nums[4]].itemList));

        struct ItemNode item6 = {items[5], NULL};
        addItem(&item6, &(rooms[nums[5]].itemList));
	//Testing all items have been assigned
	//for (int i = 0; i < 9; i++) {printItems(rooms[i]);}


        //Randomizing the characters and assigning them to rooms

        //Using the indexs to add items to rooms
        struct ItemNode char1 = {characters[0], NULL};
        addItem(&char1, &(rooms[rand() % 9].characters));

	struct ItemNode char2 = {characters[1], NULL};
        addItem(&char2, &(rooms[rand() % 9].characters));

        struct ItemNode char3 = {characters[2], NULL};
        addItem(&char3, &(rooms[rand() % 9].characters));

        struct ItemNode char4 = {characters[3], NULL};
        addItem(&char4, &(rooms[rand() % 9].characters));

	struct ItemNode char5 = {characters[4], NULL};
        addItem(&char5, &(rooms[rand() % 9].characters));
	//Testing everythig is randomized
	//for (int i = 0; i < 9; i++) {printRoom(rooms[i]);}

	//All game variables
	char command[12];
	int wins = 0;
	int guesses = 10;
	struct Room * cur = &(rooms[4]);
	struct ItemNode * inventory = NULL;
	
	//Randomly picks the winning combo
	int randIndex = rand()%5;
	char *killer = characters[randIndex];
	randIndex = rand()%6;
	char * weapon = items[randIndex];
	randIndex = rand()%9;
	char * scene = roomNames[randIndex];

	//printf("here     ---------%s, %s, %s\n", killer, weapon, scene);
	//Main while loop of the game 
	while (wins != 3 && guesses > 0) {
		printf("Please enter a command here.(Type 'help' to see a list of commands):");
		scanf("%s",command);
		if (strcmp(command, "help") == 0) {
			printf("list: Prints out a list of all rooms, characters, and items.\n");
			printf("look: Shows the curent, room, its neighbors, and the items and characters in the room.\n");
			printf("go: Asks for a direction (north, south, east, or west) and goes in that direction. \n");
			printf("take: Prompts for an item, which will then be added to your inventory.\n");
			printf("drop: Prompts for an item, which will be dropped from your inventory into the current room.\n");
			printf("inventory: Prints all the items in your inventory.\n");
			printf("clue: Will prompt you to make a guess about who done it and with item.\n");
		}
		else if (strcmp(command,"look") == 0) {
			printRoom(*cur);
		}
                else if (strcmp(command,"list") == 0) {
			printf("Rooms:");
			for (int i = 0; i < 9; i++){printf(" %s", roomNames[i]);}
			printf("\n");

			printf("Rooms:");
                        for (int i = 0; i < 5; i++){printf(" %s", characters[i]);}
                        printf("\n");

                        printf("Items:");
                        for (int i = 0; i < 6; i++){printf(" %s", items[i]);}
                        printf("\n");
                }
                else if (strcmp(command,"go") == 0) {
                        char dir[12];
			int valid = 0;

			while(valid == 0) {
				valid = 1;
				printf("Please enter a direction(north, south, east, or west): ");
				scanf("%s", dir);

				if (strcmp(dir,"north") == 0 && cur->North != NULL) {cur = cur->North;}
                                else if (strcmp(dir,"south") == 0 && cur->South != NULL) {cur = cur->South;}
                                else if (strcmp(dir,"east") == 0 && cur->East != NULL) {cur = cur->East;}
                                else if (strcmp(dir,"west") == 0 && cur->West !=NULL) {cur = cur->West;}
				else {
					printf("The direction you entered is not valid. Please try again.\n");
					valid = 0;
				}
			}
                }
                else if (strcmp(command,"take") == 0 && cur->itemList != NULL) {
			char item[14];
			printf("Please enter an item to pickup: ");
			scanf("%s", item);

			while (exists(cur->itemList, item) == 0) {
				printf("That is not a valid item. Please re-enter an item: ");
				scanf("%s", item);
			}

			/*struct ItemNode * iter = cur->itemList;
			while (strcmp(iter->name,item) != 0) {
				iter = iter->next;
			}*/
			//addItem(iter, &inventory);
			struct ItemNode * temp =get(cur->itemList,item);
			rmItem(temp, &(cur->itemList));
			temp->next = NULL;
			addItem(temp, &inventory);

			

                }
                else if (strcmp(command,"drop") == 0 && inventory != NULL) {
                        char item[14];
                        printf("Please enter an item to drop: ");
                        scanf("%s", item);

                        while (exists(inventory, item) == 0) {
                                printf("That is not a valid item. Please re-enter an item: ");
                                scanf("%s", item);
                        }

                        /*struct ItemNode * iter = cur->itemList;
                        while (strcmp(iter->name,item) != 0) {
                                iter = iter->next;
                        }*/
                        //addItem(iter, &inventory);
                        struct ItemNode * temp =get(inventory,item);
                        rmItem(temp, &inventory);
                        temp->next = NULL;
                        addItem(temp, &(cur->itemList));
			printf("\n");
                }
                else if (strcmp(command,"inventory") == 0) {
			printList(inventory);
                }
                else if (strcmp(command,"clue") == 0 && (cur->itemList != NULL || inventory != NULL)) {
			char k[12];
			char w[12];
			int kFlag = 0;
			int wFlag = 0;
			int rFlag = 0;
			guesses --;
			printf("Please Guess the killer: ");
			scanf("%s", k);

			while (check(k,1) == 0) {
				printf("That is not a valid character. Please re-enter: ");
				scanf("%s",k);
			}

			printf("Please Guess the murder weapon: ");
			scanf("%s",w);

			while (check(w,2) == 0) {
				printf("That is not a valid item.Please enter a new one(Must be in the room or your inventory):");
				scanf("%s",w);
			}

			int index = 8;
			for(int i = 0; i < 7; i++) {
				if (exists(rooms[i].characters,k) == 1){index = i;}
			}

			struct ItemNode * temp =get(rooms[index].characters,k);
                        rmItem(temp, &(rooms[index].characters));
			temp->next =NULL;
                        addItem(temp, &(cur->characters));

			if (strcmp(k,killer) == 0) {
				kFlag = 1;
				printf("Character Match!\n");
			}
			if(strcmp(w, weapon) == 0) {
				wFlag = 1; 
				printf("Item Match!\n");
			}
			if(strcmp(cur->name, scene) == 0) {
				rFlag = 1;
				printf("Room Match!\n");
			}
			wins = rFlag + wFlag + kFlag;
			printf("Guesses Remaining: %i\n", guesses);
                }
                else {
			printf("Invalid Command.");
                }
	}

	if(wins == 3){
		printf("You won!\n");
	}
	else {
		printf("You Lost!\n");
	}
	for(int i = 0; i < 9; ++i){
		struct ItemNode * current = rooms[i].itemlist;
		struct ItemNode * next ;
		while(iterator->next != NULL){
			next = current->next;
			free(current);
		}
			
	}

	return 0;
}

int check(char * sub, int flag) {
	if (flag == 1){
		for (int i = 0; i < 5; i++){
			//printf("%s, %s\n", characters[i], sub);
			if (strcmp(characters[i],sub) == 0) {return 1;}
		}
	}
	else {
		for (int i = 0; i < 8; i++) {
			if(strcmp(items[i],sub) == 0) {return 1;}
		}
	}

	return 0;
}


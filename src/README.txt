To compile the code use commands “gcc  -o play items.c rooms.c adventure.c”

To run the code use command “./play”

The game board is created using linked lists. We did this by creating a structure, “Room”, that has a north, east, west, and south pointers. 
The structure also has a name pointer that points to the name of the room. A function createRoom, dynamically allocates memory for 9 rooms 
structures then an array of strings with the 9 possible names are shuffled using the Fisher-Yates algorithm and assigned at random to the 9 created rooms.
 
To know all the possible commands, type ‘help’ and the program gives you all the commands you may use. To perform a certain action, 
you first type in what you want to do press enter then type in how you want to do it. For example, if you want to go “west” you first 
type “go”, press enter then type in “west”. This is the same for “take” and “drop” commands as well as everything else.


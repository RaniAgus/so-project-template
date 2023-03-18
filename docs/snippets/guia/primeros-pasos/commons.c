#include <stdlib.h>
#include <stdio.h>
#include <commons/collections/list.h>

int main(int argc, char *argv[]) {
    t_list *names = list_create();
    list_add(names, "Mick");
    list_add(names, "Keith");
    list_add(names, "Ronnie");
    list_add(names, "Charlie");

    list_iterate(names, (void *)puts);

    return 0;
}

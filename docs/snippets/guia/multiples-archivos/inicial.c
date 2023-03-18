#include <stdlib.h>
#include <stdio.h>
#include <commons/string.h>

typedef struct persona {
    char *nombre;
    char *apellido;
    int edad;
} t_persona;

int main(void) {
    t_persona *messi = malloc(sizeof(t_persona));
    messi->nombre = string_duplicate("Lionel");
    messi->apellido = string_duplicate("Messi");
    messi->edad = 34;

    printf("{ nombre: %s, apellido: %s, edad: %d }\n",
        messi->nombre,
        messi->apellido,
        messi->edad
    );

    free(messi->nombre);
    free(messi->apellido);
    free(messi);

    return 0;
}

#include <persona.h>

#include <stdlib.h>
#include <stdio.h>
#include <commons/string.h>

struct persona {
    char *nombre;
    char *apellido;
    int edad;
};

t_persona *persona_new(char *nombre, char *apellido, int edad) {
    t_persona *persona = malloc(sizeof(t_persona));
    persona->nombre = string_duplicate(nombre);
    persona->apellido = string_duplicate(apellido);
    persona->edad = edad;

    return persona;
}

char *persona_to_string(t_persona *persona) {
    return string_from_format(
        "{ nombre: %s, apellido: %s, edad: %d }",
        persona->nombre,
        persona->apellido,
        persona->edad
    );
}

void persona_free(t_persona *persona) {
    free(persona->nombre);
    free(persona->apellido);
    free(persona);
}

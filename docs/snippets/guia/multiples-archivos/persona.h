#ifndef PROJECT_PERSONA_H_
#define PROJECT_PERSONA_H_

    typedef struct persona t_persona;

    // También podemos agregar Docstrings como incluyen las Commons.

    /**
    * @NAME: persona_new
    * @DESC: Crea una instancia de "t_persona".
    */
    t_persona *persona_new(char *nombre, char *apellido, int edad);

    /**
    * @NAME: persona_to_string
    * @DESC: Convierte una instancia de "t_persona" a string.
    */
    char *persona_to_string(t_persona *persona);

    /**
    * @NAME: persona_free
    * @DESC: Libera la memoria ocupada por una instancia de "t_persona".
    */
    void persona_free(t_persona *persona);

#endif

#include <stdlib.h>
#include <stdio.h>
#include <persona.h>

int main(void) {
    t_persona *messi = persona_new("Lionel", "Messi", 34);

    char* messi_str = persona_to_string(messi);
    puts(messi_str);
    free(messi_str);

    persona_free(messi);
    return 0;
}

#include <utils/hello.h>
#include <commons/string.h>

char *say_hello(char* who) {
    return string_from_format("Hello %s!!", who);
}

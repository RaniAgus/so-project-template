#include <stdio.h>
#include <stdbool.h>
#include <utils/hello.h>
#include <cspecs/cspec.h>

context (example) {
    describe("say_hello") {
        it("should return a string") {
            char *result = say_hello("World");
            should_string(result) be equal to("Hello World!!");
            free(result);
        } end
    } end

}

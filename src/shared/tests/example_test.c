#include <stdio.h>
#include <stdbool.h>
#include <shared/hello.h>
#include <cspecs/cspec.h>

context (example) {
    describe("hello_world") {
        it("should return a string") {
            char *result = hello_world();
            should_string(result) be equal to("Hello World!!");
            free(result);
        } end
    } end

}

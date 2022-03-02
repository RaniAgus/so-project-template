#include <stdio.h>
#include <stdbool.h>
#include <cspecs/cspec.h>

context (example) {

    describe("Hello world") {

        it("true should be true") {
            should_bool(true) be equal to(true);
        } end

        it("true shouldn't be false") {
            should_bool(true) not be equal to(false);
        } end

        it("this test will fail because 10 is not equal to 11") {
            should_int(hello()) be equal to(11);
        } end

        skip("this test will fail because \"Hello\" is not \"Bye\"") {
            should_string("Hello") be equal to("Bye");
        } end

    } end

}

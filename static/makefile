include settings.mk

# =======================[ Generic compilation rules ]======================= #

# Set project name
NAME=$(shell cd . && pwd | xargs basename)

# Set prerrequisites
SRCS_C != find src/ -iname "*.c"
SRCS_H != find include/ -iname "*.h"
DEPS = $(addsuffix /src,$(LIBPATHS))

# Set header files' directories to (-I)nclude
IDIRS = $(addsuffix /include,$(LIBPATHS) .)

# Set library files' directories to (-L)ook
LIBDIRS = $(addsuffix /bin,$(LIBPATHS))

# Set intermediate objects
OBJS = $(patsubst src/%.c,obj/%.o,$(SRCS_C))

# Set targets
BIN = bin/lib$(NAME).a

.PHONY: debug
debug: CFLAGS = $(CDEBUG)
debug: $(BIN)

.PHONY: release
release: CFLAGS = $(CRELEASE)
release: $(BIN)

.PHONY: clean
clean:
	-rm -rfv $(dir $(BIN) $(OBJS))

.PHONY: watch
watch:
	while sleep 0.1; do \
		find src/ include/ | entr -d make debug --no-print-directory; \
	done

# ===================[ Static-specific compilation rules ]=================== #

$(BIN): $(OBJS) | $(dir $(BIN))
	ar rcs -o "$@" $^

obj/%.o: src/%.c $(SRCS_H) $(DEPS) | $(dir $(OBJS))
	gcc $(CFLAGS) -c -o "$@" $< $(IDIRS:%=-I%)

$(dir $(BIN) $(OBJS)):
	mkdir -pv $@

# ==================================[ Help ]================================== #

.PHONY: help

help:
	@echo "COMPILATION COMMANDS:"
	@echo "    make / make debug -- Build project using debug flags."
	@echo "    make release      -- Build project using release flags."
	@echo "    make clean        -- Remove generated files from file system."
	@echo "    make watch        -- Run 'make debug' when any file is modified."

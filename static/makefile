include settings.mk

# Set prerrequisites
SRCS_C != find src/ -iname "*.c"
SRCS_H != find include/ -iname "*.h"
DEPS = $(addsuffix /src,$(LIBPATHS))

# Set targets
BINDIR = bin
BIN = $(BINDIR)/$(NAME).a
OBJS = $(patsubst src/%.c,obj/%.o,$(SRCS_C))
OBJDIRS = $(dir $(OBJS))

# Set header files' directories to (-I)nclude
IDIRS = $(addsuffix /include,$(LIBPATHS) .)

# Set library files' directories to (-L)ook
LIBDIRS = $(addsuffix /bin,$(LIBPATHS))

# ===========================[ Compilation rules ]=========================== #

.PHONY: debug
debug: CFLAGS = $(CDEBUG)
debug: $(BIN)

.PHONY: release
release: CFLAGS = $(CRELEASE)
release: $(BIN)

$(BIN): $(OBJS) | $(BINDIR)
	ar rcs -o "$@" $(OBJECTS)

obj/%.o: src/%.c $(SRCS_H) $(DEPS) | $(OBJDIRS)
	gcc $(CFLAGS) -c -o "$@" $< $(IDIRS:%=-I%)

$(BINDIR) $(OBJDIRS):
	mkdir -pv $@

.PHONY: clean
clean:
	-rm -rfv $(OBJS) $(BIN)

.PHONY: watch
watch:
	while sleep 0.1; do \
		find src/ include/ | entr -d make debug --no-print-directory; \
	done

# ==================================[ Help ]================================== #

.PHONY: help

help:
	@echo "COMPILATION COMMANDS:"
	@echo "    make / make debug -- Build project using debug flags."
	@echo "    make release      -- Build project using release flags."
	@echo "    make clean        -- Remove generated files from file system."
	@echo "    make watch        -- Run 'make debug' when any file is modified."

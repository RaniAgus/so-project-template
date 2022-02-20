include settings.mk

# [ Generic compilation variables ] #

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

# [ Shared-specific compilation variables ] #

# Set targets
BIN = bin/lib$(NAME).so

# [ Generic compilation rules ] #

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

# [ Shared-specific compilation rules ] #

$(BIN): $(OBJS) | $(dir $(BIN))
	gcc $(CFLAGS) -shared -o "$@" $^ $(LIBDIRS:%=-L%) $(LIBS:%=-l%)

obj/%.o: src/%.c $(SRCS_H) $(DEPS) | $(dir $(OBJS))
	gcc $(CFLAGS) -fPIC -c -o "$@" $< $(IDIRS:%=-I%)

$(dir $(BIN) $(OBJS)):
	mkdir -pv $@

# [ Installing rules ] #

.PHONY: install
install: release
	sudo cp -uva $(dir $(BIN))/. $(INST_LIB)
	sudo cp -uva include/. $(INST_H)

.PHONY: uninstall
uninstall:
	sudo rm -fv $(patsubst bin/%,$(INST_LIB)/%,$(BIN))
	sudo rm -fvr $(patsubst include/%,$(INST_H)/%,$(SRCS_H))

# [ Help ] #

.PHONY: help

help:
	@echo "COMPILATION COMMANDS:"
	@echo "    make / make debug -- Build project using debug flags."
	@echo "    make release      -- Build project using release flags."
	@echo "    make clean        -- Remove generated files from file system."
	@echo "    make watch        -- Run 'make debug' when any file is modified."
	@echo "INSTALLATION COMMANDS:"
	@echo "    make install      -- Install the shared library and its headers."
	@echo "    make uninstall    -- Remove the shared object and its headers."

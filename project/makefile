# Include libraries here
LIBRARIES=
# Include custom library paths here
SHARED_LIBRARY_PATHS=
STATIC_LIBRARY_PATHS=

# ==============================================================================================================

# Project name
PROJECT=$(shell basename $(shell cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd))

# Project structure
SRCDIR=src/
IDIR=include/
OBJDIR=obj/
BINDIR=bin/

# Functions
import = $(shell make --no-print-directory -C $(1) $(2) | tr ' ' '\n' | xargs -i echo $(3)$(1)/{})
import_all = $(foreach var,$(1),$(call import,$(var),$(2),$(3)))

# Directories
MKDIR=mkdir -pv
RM=rm -rfv
DIRECTORIES=$(BINDIR) $(patsubst %,$(OBJDIR)%,$(shell find $(SRCDIR) -type d))

# Compiler
CC=gcc
CFLAGS=-Wall -DDEBUG -g
SOURCES=$(shell find $(SRCDIR) -iname "*.c")
HEADERS=$(shell find $(IDIR) -iname "*.h")
LIBRARY_PATHS=$(SHARED_LIBRARY_PATHS) $(STATIC_LIBRARY_PATHS)
INCLUDES=$(call import_all,$(LIBRARY_PATHS),idir,-I) $(IDIR:%=-I%)

# Linker
LINKS=$(call import_all,$(LIBRARY_PATHS),bindir,-L) $(LIBRARIES:%=-l%)

# Objects
BINARY=$(BINDIR)$(PROJECT).out
OBJECTS=$(SOURCES:%.c=$(OBJDIR)%.o)

# Dependencies
DEPENDENCIES=$(call import_all,$(LIBRARY_PATHS),sources,)

# Shared Libraries
RUNTIME_LINKS=$(subst $() $(),:,$(call import_all,$(SHARED_LIBRARY_PATHS),bindir,))

# ==============================================================================================================

all: $(BINARY)

clean:
	$(RM) $(OBJDIR) $(BINARY)

watch:
	while true; do \
	find $(SRCDIR) $(IDIR) | entr -d make --no-print-directory; \
	done;

release: CFLAGS = -Wall -DNDEBUG
release: clean
release: all

start: all
	export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH):$(RUNTIME_LINKS); \
	valgrind --tool=none ./$(BINARY) $(ARGS)

memcheck: all
	export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH):$(RUNTIME_LINKS); \
	valgrind --leak-check=full --log-file="$@_$(PROJECT).log" ./$(BINARY) $(ARGS)

helgrind: all
	export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH):$(RUNTIME_LINKS); \
	valgrind --tool=helgrind --log-file="$@_$(PROJECT).log" ./$(BINARY) $(ARGS)

help:
	@echo "COMMANDS:"
	@echo "    make / make all -- Build project using debug flags."
	@echo "    make release    -- Build project using release flags."
	@echo "    make clean      -- Remove generated files from file system."
	@echo "    make watch      -- Run make when files change."
	@echo "    make start      -- Run using valgrind without any extra tool."
	@echo "    make memcheck   -- Run using valgrind memcheck tool. Output will be redirected to an external log file."
	@echo "    make helgrind   -- Run using valgrind helgrind tool. Output will be redirected to an external log file."
	@echo "VARIABLES:"
	@echo "    ARGS          -- Arguments to be passed to main() using valgrind tools (eg: 'make helgrind ARGS=\"arg1 arg2 arg3\"')."
	@echo "    LIBRARIES     -- External libraries to be included and linked, separated by spaces (eg: 'utils pthread commons')."
	@echo "    LIBRARY_PATHS -- Relative path to own static libraries root, separated by spaces (eg: '../utils')."
	@echo "    PROJECT       -- Your project name. By default it will be your pwd basename."

# ==============================================================================================================

# Build project
$(BINARY): $(DIRECTORIES) $(OBJECTS)
	$(CC) $(INCLUDES) $(CFLAGS) -o "$@" $(OBJECTS) $(LINKS)

# Create directories for objects
$(DIRECTORIES):
	$(MKDIR) $@

# Build objects
$(OBJDIR)$(SRCDIR)%.o: $(SRCDIR)%.c $(HEADERS) $(DEPENDENCIES)
	$(CC) $(INCLUDES) $(CFLAGS) -c -o "$@" "$<"

# ==============================================================================================================

makefile-test:
	@echo "Project name:  $(PROJECT)"
	@echo "Source files:  $(SOURCES)"
	@echo "Dependencies:  $(DEPENDENCIES)"
	@echo "Include flags: $(INCLUDES)"
	@echo "Link flags:    $(LINKS)"
	@echo "Directories:   $(DIRECTORIES)"
	@echo "Runtime links: $(RUNTIME_LINKS)"

.PHONY: all clean watch debug release start test memcheck helgrind makefile-test help
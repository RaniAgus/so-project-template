# Include libraries here
LIBRARIES=
# Include custom library paths here
SHARED_LIBRARY_PATHS=
STATIC_LIBRARY_PATHS=

# ==============================================================================================================

# Project name
PROJECT != cd . && pwd | xargs basename

# Project structure
SRCDIR=src/
IDIR=include/
OBJDIR=obj/
BINDIR=bin/

# Functions
import = $(shell make --no-print-directory -C $(1) $(2) | xargs -i echo $(3)$(1)/{})
import_all = $(foreach var,$(1),$(call import,$(var),$(2),$(3)))

# Directories
MKDIR=mkdir -pv
RM=rm -rfv
SOURCE_DIRECTORIES != find $(SRCDIR) -type d
DIRECTORIES=$(SOURCE_DIRECTORIES:$(SRCDIR)%=$(OBJDIR)%) $(BINDIR)

# Compiler
CC=gcc
CFLAGS=-Wall -DDEBUG -g
SOURCES != find $(SRCDIR) -iname "*.c"
HEADERS != find $(IDIR) -iname "*.h"
LIBRARY_PATHS=$(SHARED_LIBRARY_PATHS) $(STATIC_LIBRARY_PATHS)
INCLUDES=$(call import_all,$(LIBRARY_PATHS),IDIR,-I) $(IDIR:%=-I%)

# Linker
LINKS=$(call import_all,$(LIBRARY_PATHS),BINDIR,-L) $(LIBRARIES:%=-l%)

# Objects
BINARY=$(BINDIR)$(PROJECT).out
OBJECTS=$(SOURCES:$(SRCDIR)%.c=$(OBJDIR)%.o)

# Dependencies
DEPENDENCIES=$(call import_all,$(LIBRARY_PATHS),SOURCES HEADERS,)

# Shared Libraries
RUNTIME_LINKS != echo $(call import_all,$(SHARED_LIBRARY_PATHS),BINDIR,) | tr ' ' ':'

# ==============================================================================================================

.PHONY: all

all: $(BINARY)

.PHONY: clean

clean:
	$(RM) $(OBJDIR) $(BINARY)

.PHONY: release

release: CFLAGS = -Wall -DNDEBUG
release: clean
release: all

.PHONY: watch

watch:
	while true; do \
	find $(SRCDIR) $(IDIR) | entr -d make --no-print-directory; \
	done;

.PHONY: start

start: all
	export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH):$(RUNTIME_LINKS); \
	valgrind --tool=none ./$(BINARY) $(ARGS)

.PHONY: memcheck

memcheck: all
	export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH):$(RUNTIME_LINKS); \
	valgrind --leak-check=full --log-file="$@_$(PROJECT).log" ./$(BINARY) $(ARGS)

.PHONY: helgrind

helgrind: all
	export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH):$(RUNTIME_LINKS); \
	valgrind --tool=helgrind --log-file="$@_$(PROJECT).log" ./$(BINARY) $(ARGS)

# ==============================================================================================================

# Build project
$(BINARY): $(DIRECTORIES) $(OBJECTS)
	$(CC) $(INCLUDES) $(CFLAGS) -o "$@" $(OBJECTS) $(LINKS)

# Create directories for objects
$(DIRECTORIES):
	$(MKDIR) $@

# Build objects
$(OBJDIR)%.o: $(SRCDIR)%.c $(HEADERS) $(DEPENDENCIES)
	$(CC) $(INCLUDES) $(CFLAGS) -c -o "$@" "$<"

# ==============================================================================================================

.PHONY: help

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

.PHONY: maketest

maketest:
	@echo "Project name:  $(PROJECT)"
	@echo "Source files:  $(SOURCES)"
	@echo "Dependencies:  $(DEPENDENCIES)"
	@echo "Include flags: $(INCLUDES)"
	@echo "Link flags:    $(LINKS)"
	@echo "Directories:   $(DIRECTORIES)"
	@echo "Runtime links: $(RUNTIME_LINKS)"

%:
	@echo $($@) | tr ' ' '\n'
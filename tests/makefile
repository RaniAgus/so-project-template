PROJECT_PATH=

# ==============================================================================================================

# Project name
PROJECT != cd . && pwd | xargs basename

# Project structure
SRCDIR=src/
BINDIR=bin/

# Functions
import = $(shell make --no-print-directory -C $(1) $(2) | xargs -i echo $(3)$(1)/{})
import_all = $(foreach var,$(1),$(call import,$(var),$(2),$(3)))

# Directories
MKDIR=mkdir -pv
RM=rm -rfv
SOURCE_DIRECTORIES != find $(SRCDIR) -type d
DIRECTORIES=$(BINDIR)

# Compiler
CC=gcc
CFLAGS=-Wall -DDEBUG -g
SOURCES != find $(SRCDIR) -iname "*.c"

ifneq ($(PROJECT_PATH),)

# Project sources
SOURCES+=$(call import_all,$(PROJECT_PATH),SOURCES HEADERS)

# Project libraries (except readline)
LIBRARIES=$(shell make --no-print-directory -C $(PROJECT_PATH) LIBRARIES | grep -v "readline")

# Project library paths
SHARED_LIBRARY_PATHS=$(call import_all,$(PROJECT_PATH),SHARED_LIBRARY_PATHS)
STATIC_LIBRARY_PATHS=$(call import_all,$(PROJECT_PATH),STATIC_LIBRARY_PATHS)

endif

LIBRARY_PATHS=$(SHARED_LIBRARY_PATHS) $(STATIC_LIBRARY_PATHS)
INCLUDES=$(call import_all,$(LIBRARY_PATHS),IDIR,-I)

# Linker
LIBRARIES+=cspecs
LINKS=$(call import_all,$(LIBRARY_PATHS),BINDIR,-L) $(LIBRARIES:%=-l%)

# Objects
BINARY=$(BINDIR)$(PROJECT).out

# Dependencies
DEPENDENCIES=$(call import_all,$(LIBRARY_PATHS),SOURCES HEADERS)

# Shared Libraries
RUNTIME_LINKS != echo $(call import_all,$(SHARED_LIBRARY_PATHS),BINDIR) | tr ' ' ':'

# ==============================================================================================================

.PHONY: all

all: $(BINARY)

.PHONY: clean

clean:
	$(RM) $(BINARY) $(BINDIR)

.PHONY: watch

watch:
	while true; do \
		find $(SRCDIR) $(PROJECT_PATH) | entr -d make --no-print-directory; \
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
$(BINARY): $(DIRECTORIES) $(SOURCES) $(DEPENDENCIES)
	$(CC) $(INCLUDES) $(CFLAGS) -o "$@" $(SOURCES) $(LINKS)

# Create directories for binary
$(DIRECTORIES):
	$(MKDIR) $@

# ==============================================================================================================

.PHONY: help

help:
	@echo "COMMANDS:"
	@echo "    make / make all -- Build project using debug flags."
	@echo "    make clean      -- Remove generated files from file system."
	@echo "    make watch      -- Run make when files change."
	@echo "    make start      -- Run using valgrind without any extra tool."
	@echo "    make memcheck   -- Run using valgrind memcheck tool. Output will be redirected to an external log file."
	@echo "    make helgrind   -- Run using valgrind helgrind tool. Output will be redirected to an external log file."
	@echo "VARIABLES:"
	@echo "    ARGS          -- Arguments to be passed to main() using valgrind tools (eg: 'make helgrind ARGS=\"arg1 arg2 arg3\"')."
	@echo "    PROJECT_PATH  -- Source folder for the project that is being tested."

.PHONY: maketest

maketest:
	@echo "PROJECT:       $(PROJECT)"
	@echo "DIRECTORIES:   $(DIRECTORIES)"
	@echo "LIBRARY_PATHS: $(LIBRARY_PATHS)"
	@echo "SOURCES:       $(SOURCES)"
	@echo "INCLUDES:      $(INCLUDES)"
	@echo "LINKS:         $(LINKS)"
	@echo "DEPENDENCIES:  $(DEPENDENCIES)"
	@echo "RUNTIME_LINKS: $(RUNTIME_LINKS)"

%:
	@echo $($@) | tr ' ' '\n'
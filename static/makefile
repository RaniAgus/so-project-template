# Include custom library paths here
LIBRARY_PATHS=

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
DIRECTORIES=$(patsubst %,$(OBJDIR)%,$(shell find $(SRCDIR) -type d)) $(BINDIR)

# Compiler
CC=gcc
CFLAGS=-Wall -DDEBUG -g
SOURCES=$(shell find $(SRCDIR) -iname "*.c")
HEADERS=$(shell find $(IDIR) -iname "*.h")
INCLUDES=$(call import_all,$(LIBRARY_PATHS),idir,-I) $(IDIR:%=-I%)

# Objects
BINARY=$(BINDIR)lib$(PROJECT).a
OBJECTS=$(SOURCES:%.c=$(OBJDIR)%.o)

# Dependencies
DEPENDENCIES=$(call import_all,$(LIBRARY_PATHS),sources,)

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

# ==============================================================================================================

# Build project
$(BINARY): $(DIRECTORIES) $(OBJECTS)
	ar rcs -o "$@" $(OBJECTS)

# Create directories for objects
$(DIRECTORIES):
	$(MKDIR) $@

# Build objects
$(OBJDIR)$(SRCDIR)%.o: $(SRCDIR)%.c $(HEADERS) $(DEPENDENCIES)
	$(CC) $(INCLUDES) $(CFLAGS) -c -o "$@" "$<"

# ==============================================================================================================

.PHONY: sources

sources:
	@echo $(SOURCES) $(HEADERS)

.PHONY: idir

idir:
	@echo $(IDIR)

.PHONY: bindir

bindir:
	@echo $(BINDIR)

.PHONY: help

help:
	@echo "COMMANDS:"
	@echo "    make / make all -- Build project using debug flags."
	@echo "    make release    -- Build project using release flags."
	@echo "    make watch      -- Run make when files change."
	@echo "    make clean      -- Remove generated files from file system."
	@echo "VARIABLES:"
	@echo "    LIBRARY_PATHS -- Relative path to own static libraries root, separated by spaces (eg: '../utils')."
	@echo "    PROJECT       -- Your project name. By default it will be your pwd basename."

.PHONY: maketest

maketest:
	@echo "Project name:  $(PROJECT)"
	@echo "Source files:  $(SOURCES)"
	@echo "Dependencies:  $(DEPENDENCIES)"
	@echo "Include flags: $(INCLUDES)"
	@echo "Directories:   $(DIRECTORIES)"
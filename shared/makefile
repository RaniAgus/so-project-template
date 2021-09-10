# Include custom library paths here
LIBRARY_PATHS=

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
INCLUDES=$(call import_all,$(LIBRARY_PATHS),idir,-I) $(IDIR:%=-I%)

# Objects
BINARY=$(BINDIR)lib$(PROJECT).so
OBJECTS=$(SOURCES:$(SRCDIR)%.c=$(OBJDIR)%.o)

# Dependencies
DEPENDENCIES=$(call import_all,$(LIBRARY_PATHS),sources,)

# Installation targets
INSTLIB=/usr/lib/
INSTINCLUDE=/usr/include/

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

.PHONY: install

install: release
	sudo cp -uv $(BINARY) $(INSTLIB)
	sudo cp -uva $(IDIR). $(INSTINCLUDE)

.PHONY: uninstall

uninstall:
	sudo rm -fv $(BINARY:$(BINDIR)%=$(INSTLIB)%)
	sudo rm -fvr $(HEADERS:$(IDIR)%=$(INSTINCLUDE)%)

# ==============================================================================================================

# Build project
$(BINARY): $(DIRECTORIES) $(OBJECTS)
	$(CC) -shared -o "$@" $(OBJECTS)

# Create directories for objects
$(DIRECTORIES):
	$(MKDIR) $@

# Build objects
$(OBJDIR)%.o: $(SRCDIR)%.c $(HEADERS) $(DEPENDENCIES)
	$(CC) $(INCLUDES) $(CFLAGS) -fPIC -c -o "$@" "$<"

# ==============================================================================================================

.PHONY: sources

sources:
	@echo $(SOURCES) $(HEADERS) | tr ' ' '\n'

.PHONY: idir

idir:
	@echo $(IDIR) | tr ' ' '\n'

.PHONY: bindir

bindir:
	@echo $(BINDIR) | tr ' ' '\n'


.PHONY: help

help:
	@echo "COMMANDS:"
	@echo "    make / make all -- Build project using debug flags."
	@echo "    make release    -- Build project using release flags."
	@echo "    make watch      -- Run make when files change."
	@echo "    make clean      -- Remove generated files from file system."
	@echo "    make install    -- Install the shared library and headers."
	@echo "    make uninstall  -- Remove the shared object and its corresponding headers."
	@echo "VARIABLES:"
	@echo "    LIBRARY_PATHS -- Relative path to own static libraries root, separated by spaces (eg: '../utils')."
	@echo "    PROJECT       -- Your project name. By default it will be your pwd basename."

.PHONY: maketest

maketest:
	@echo "Project name:  $(PROJECT)"
	@echo "Source files:  $(SOURCES)"
	@echo "Header files:  $(HEADERS)"
	@echo "Dependencies:  $(DEPENDENCIES)"
	@echo "Include flags: $(INCLUDES)"
	@echo "Directories:   $(DIRECTORIES)"
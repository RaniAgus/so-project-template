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

# Directories
MKDIR=mkdir -pv
RM=rm -rfv
DIRECTORIES=$(patsubst %,$(OBJDIR)%,$(shell find $(SRCDIR) -type d | tr '\n' ' ')) $(BINDIR)

# Compiler
CC=gcc
CFLAGS=-Wall -DDEBUG -g
SOURCES=$(shell find $(SRCDIR) -iname "*.c" | tr '\n' ' ')
INCLUDES=$(foreach LIBPATH,$(LIBRARY_PATHS),-I$(LIBPATH)/$(shell make --no-print-directory -C $(LIBPATH) idir)) $(IDIR:%=-I%)

# Objects
BINARY=$(BINDIR)lib$(PROJECT).so
OBJECTS=$(SOURCES:%.c=$(OBJDIR)%.o)

# Dependencies
DEPENDENCIES=$(foreach LIBPATH,$(LIBRARY_PATHS),$(patsubst %,$(LIBPATH)/%,$(shell make --no-print-directory -C $(LIBPATH) sources)))

# Installation targets
HEADERS=$(shell find $(IDIR) -iname "*.h" | tr '\n' ' ')
INSTDIR=/usr/lib/
INCLDIR=/usr/include/

# ==============================================================================================================

all: $(BINARY)

clean:
	$(RM) $(OBJDIR) $(BINARY)

release: CFLAGS = -Wall -DNDEBUG
release: clean
release: all

install: release
	sudo cp -uv $(BINARY) $(INSTDIR)
	sudo cp -uva $(IDIR). $(INCLDIR)

uninstall:
	sudo rm -fv $(BINARY:$(BINDIR)%=$(INSTDIR)%)
	sudo rm -fvr $(HEADERS:$(IDIR)%=$(INCLDIR)%)

help:
	@echo "COMMANDS:"
	@echo "    make / make all -- Build project using debug flags."
	@echo "    make project    -- Build project using release flags."
	@echo "    make clean      -- Remove generated files from file system."
	@echo "    make install    -- Install the shared library and headers."
	@echo "    make uninstall  -- Remove the shared object and its corresponding headers."
	@echo "VARIABLES:"
	@echo "    LIBRARY_PATHS -- Relative path to own static libraries root, separated by spaces (eg: '../utils')."
	@echo "    PROJECT       -- Your project name. By default it will be your pwd basename."

# ==============================================================================================================

# Build project
$(BINARY): $(DIRECTORIES) $(OBJECTS)
	$(CC) -shared -o "$@" $(OBJECTS)

# Create directories for objects
$(DIRECTORIES):
	$(MKDIR) $@

# Build objects
$(OBJDIR)$(SRCDIR)%.o: $(SRCDIR)%.c $(IDIR)%.h $(DEPENDENCIES)
	$(CC) $(INCLUDES) $(CFLAGS) -c -fmessage-length=0 -fPIC -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o "$@" "$<"

$(OBJDIR)%.o: %.c $(DEPENDENCIES)
	$(CC) $(INCLUDES) $(CFLAGS) -c -fmessage-length=0 -fPIC -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o "$@" "$<"

# ==============================================================================================================

makefile-test:
	@echo "Project name:  $(PROJECT)"
	@echo "Source files:  $(SOURCES)"
	@echo "Header files:  $(HEADERS)"
	@echo "Dependencies:  $(DEPENDENCIES)"
	@echo "Include flags: $(INCLUDES)"
	@echo "Directories:   $(DIRECTORIES)"

sources:
	@echo $(SOURCES) $(HEADERS)

idir:
	@echo $(IDIR)

bindir:
	@echo $(BINDIR)

.PHONY: all clean debug release dependencies makefile-test help idir bindir
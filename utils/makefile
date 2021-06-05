# Include custom library paths here
LIBRARY_PATHS=

# ==============================================================================================================

# Project name
PROJECT=$(shell basename $(shell cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd))


# Main subirectories
SRCDIR=src
OBJDIR=obj
BINDIR=bin

# Directories
DIRECTORIES=$(patsubst $(SRCDIR)%,$(OBJDIR)%,$(shell find $(SRCDIR) -type d | tr '\n' ' ')) $(BINDIR)

# Compiler
CC=gcc
CFLAGS=-Wall -DDEBUG -g
SOURCES=$(filter ./$(SRCDIR)/%,$(shell find . -iname "*.c" | tr '\n' ' '))
INCLUDES=$(foreach LIBPATH,$(LIBRARY_PATHS),-I$(LIBPATH)/$(shell make --no-print-directory -C $(LIBPATH) idir))

# Objects
BINARY=$(BINDIR)/lib$(PROJECT).a
OBJECTS=$(SOURCES:./$(SRCDIR)/%.c=$(OBJDIR)/%.o)

# Dependencies
DEPENDENCIES=$(foreach LIBPATH,$(LIBRARY_PATHS),$(patsubst ./%,$(LIBPATH)/%,$(shell make --no-print-directory -C $(LIBPATH) sources)))

# ==============================================================================================================

all: $(BINARY)

clean:
	rm -rf $(BINDIR) $(OBJDIR)

release: CFLAGS = -Wall -DNDEBUG
release: clean
release: all
help:
	@echo "COMMANDS:"
	@echo "    make / make all -- Build project using debug flags."
	@echo "    make project    -- Build project using release flags."
	@echo "    make clean      -- Remove generated files from file system."
	@echo "VARIABLES:"
	@echo "    LIBRARIES     -- External libraries to be included and linked, separated by spaces (eg: 'pthread commons utils')."
	@echo "    LIBRARY_PATHS -- Relative path to own static libraries root, separated by spaces (eg: '../utils')."
	@echo "    PROJECT       -- Your project name. By default it will be your pwd basename."

# ==============================================================================================================

# Build project
$(BINARY): $(DIRECTORIES) $(OBJECTS)
	ar rcs -o "$@" $(OBJECTS)

# Create directories for objects
$(DIRECTORIES):
	mkdir -p $@

# Build objects
$(OBJDIR)/%.o: $(SRCDIR)/%.c $(SRCDIR)/%.h $(DEPENDENCIES)
	$(CC) $(INCLUDES) $(CFLAGS) -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o "$@" "$<"

$(OBJDIR)/%.o: $(SRCDIR)/%.c $(DEPENDENCIES)
	$(CC) $(INCLUDES) $(CFLAGS) -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o "$@" "$<"

# ==============================================================================================================

makefile-test:
	@echo "Project name:  $(PROJECT)"
	@echo "Source files:  $(SOURCES)"
	@echo "Dependencies:  $(DEPENDENCIES)"
	@echo "Include flags: $(INCLUDES)"
	@echo "Directories:   $(DIRECTORIES)"

sources:
	@echo $(SOURCES) $(filter ./$(SRCDIR)/%, $(shell find . -iname "*.h" | tr '\n' ' '))

idir:
	@echo $(SRCDIR)

bindir:
	@echo $(BINDIR)

.PHONY: all clean debug release dependencies makefile-test help idir bindir
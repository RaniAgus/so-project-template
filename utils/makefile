# Include custom library paths here
LIBRARY_PATHS=

# ==============================================================================================================

# Project name
PROJECT=$(shell basename $(PWD))

# Main subirectories
SRCDIR=src
OBJDIR=obj
BINDIR=bin

# Directories
DIRECTORIES=$(patsubst $(SRCDIR)%,$(OBJDIR)%,$(shell find $(SRCDIR) -type d | tr '\n' ' ')) $(BINDIR)

# Compiler
CC=gcc
CFLAGS=-Wall -DDEBUG -g

# Linker
SOURCES=$(filter ./$(SRCDIR)/%,$(shell find . -iname "*.c" | tr '\n' ' '))
INCLUDES=$(LIBRARY_PATHS:%=-I"%")

# Objects
BINARY=$(BINDIR)/lib$(PROJECT).a
OBJECTS=$(SOURCES:./$(SRCDIR)/%.c=$(OBJDIR)/%.o)

# Dependencies
DEPENDENCIES=$(foreach LIBPATH,$(LIBRARY_PATHS),$(patsubst ./%,$(LIBPATH)/%,$(shell cd $(LIBPATH) && make sources)))

# ==============================================================================================================

all: $(BINARY)

clean:
	rm -rf $(BINDIR) $(OBJDIR)

release: CFLAGS = -Wall -DNDEBUG
release: clean
release: all

sources:
	@echo $(SOURCES) $(filter ./$(SRCDIR)/%, $(shell find . -iname "*.h" | tr '\n' ' '))

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

.PHONY: all clean debug release dependencies makefile-test
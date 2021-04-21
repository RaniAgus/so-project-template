# Include custom library paths here
LIBRARY_PATHS=

# ==============================================================================================================

# Project name
PROJECT=$(shell basename $(shell cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd))

# Compiler
CC=gcc
CFLAGS=-Wall -DDEBUG -g
INCLUDES=$(LIBRARY_PATHS:%=-I"%")

# Main subirectories
SRCDIR=$(PROJECT)
OBJDIR=obj
BINDIR=bin

# Directories
DIRECTORIES=$(BINDIR) $(OBJDIR) $(patsubst $(SRCDIR)/%, $(OBJDIR)/%, $(shell find $(SRCDIR) -type d))

# Objects
BINARY=$(BINDIR)/lib$(PROJECT).a
OBJECTS=$(patsubst ./$(SRCDIR)/%.c, $(OBJDIR)/%.o, $(shell find . -iname "*.c" | tr '\n' ' '))

# ==============================================================================================================

all: $(BINARY)

clean:
	rm -rf $(BINDIR) $(OBJDIR)

release: CFLAGS = -Wall -DNDEBUG
release: clean
release: all

dependencies:
	@echo $(shell find . -iname "*.c" | tr '\n' ' ') $(shell find . -iname "*.h" | tr '\n' ' ')

# ==============================================================================================================

# Build project
$(BINARY): $(DIRECTORIES) $(OBJECTS)
	ar rcs -o "$@" $(OBJECTS)

# Create directories for objects
$(DIRECTORIES):
	mkdir -p $@

# Build objects
$(OBJDIR)/%.o: $(SRCDIR)/%.c $(SRCDIR)/%.h
	$(CC) $(INCLUDES) $(CFLAGS) -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o "$@" "$<"

$(OBJDIR)/%.o: $(SRCDIR)/%.c
	$(CC) $(INCLUDES) $(CFLAGS) -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o "$@" "$<"

.PHONY: all clean debug release dependencies
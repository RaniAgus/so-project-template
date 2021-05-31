# Include libraries here
LIBRARIES=
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
INCLUDES=$(LIBRARY_PATHS:%=-I"%/src")

# Linker
SOURCES=$(filter ./$(SRCDIR)/%, $(shell find . -iname "*.c" | tr '\n' ' '))
LINKS=$(LIBRARY_PATHS:%=-L"%/bin") $(LIBRARIES:%=-l%)

# Objects
BINARY=$(BINDIR)/$(PROJECT)
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

memcheck: all
	valgrind --leak-check=full --log-file="$@_$(PROJECT).log" $(BINARY) $(ARGS)

helgrind: all
	valgrind --tool=helgrind --log-file="$@_$(PROJECT).log" $(BINARY) $(ARGS)

# ==============================================================================================================

# Build project
$(BINARY): $(DIRECTORIES) $(OBJECTS)
	$(CC) $(CFLAGS) -o "$@" $(OBJECTS) $(LINKS)

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
	@echo "Link flags:    $(LINKS)"
	@echo "Directories:   $(DIRECTORIES)"

.PHONY: all clean debug release memcheck helgrind makefile-test
# Include libraries here
LIBRARIES=
# Include custom library paths here
LIBRARY_PATHS=

# ==============================================================================================================

# Project name
PROJECT=$(shell basename $(shell cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd))

# Compiler
CC=gcc
CFLAGS=-Wall -DDEBUG -g
INCLUDES=$(LIBRARY_PATHS:%=-I"%")

# Linker
LINKS=$(LIBRARY_PATHS:%=-L"%/bin") $(LIBRARIES:%=-l%)

# Main subirectories
SRCDIR=src
OBJDIR=obj
BINDIR=bin

# Directories
DIRECTORIES=$(BINDIR) $(OBJDIR) $(patsubst $(SRCDIR)/%, $(OBJDIR)/%, $(shell find $(SRCDIR) -type d))

# Objects
BINARY=$(BINDIR)/$(PROJECT)
OBJECTS=$(patsubst ./$(SRCDIR)/%.c, $(OBJDIR)/%.o, $(shell find . -iname "*.c" | tr '\n' ' '))

# Dependencies
DEPENDENCIES=$(foreach THERE, $(LIBRARY_PATHS), $(patsubst ./%,$(THERE)/%,$(shell make --no-print-directory -C $(THERE) dependencies)))

# ==============================================================================================================

all: $(BINARY)

clean:
	rm -rf $(BINDIR) $(OBJDIR)

release: CFLAGS = -Wall -DNDEBUG
release: clean
release: all

memcheck: all
	valgrind --leak-check=full --log-file="$@_$(PROJECT).log" $(BINARY)

helgrind: all
	valgrind --tool=helgrind --log-file="$@_$(PROJECT).log" $(BINARY)

# ==============================================================================================================

# Build project
$(BINARY): $(DIRECTORIES) $(OBJECTS)
	$(CC) $(CFLAGS) -o "$@" $(OBJECTS) $(LINKS)

# Create directories for objects
$(DIRECTORIES):
	mkdir -p $@

# Build objects
$(OBJDIR)/%.o: $(SRCDIR)/%.c $(SRCDIR)/%.h $(DEPENDENCIES)
	@for f in $(LIBRARY_PATHS); do make --no-print-directory -C $$f; done
	$(CC) $(INCLUDES) $(CFLAGS) -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o "$@" "$<"

$(OBJDIR)/%.o: $(SRCDIR)/%.c $(DEPENDENCIES)
	@for f in $(LIBRARY_PATHS); do make --no-print-directory -C $$f; done
	$(CC) $(INCLUDES) $(CFLAGS) -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o "$@" "$<"

.PHONY: all clean debug release memcheck helgrind
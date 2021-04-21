# Edit objects folder name here
OBJ=obj

# Setup
CC=gcc
NAME:=$(shell basename $(shell cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd))
SRC_DIRS=$(shell find $(NAME) -type d)
OBJ_DIRS=$(patsubst $(NAME)%,$(OBJ)%,$(SRC_DIRS))
C_SRCS=$(shell find . -iname "*.c" | tr '\n' ' ')
H_SRCS=$(shell find . -iname "*.h" | tr '\n' ' ')
OBJS=$(C_SRCS:./$(NAME)/%.c=$(OBJ)/%.o)

# All target
all: lib$(NAME).so

# Compile .so
lib$(NAME).so: $(OBJ_DIRS) $(OBJS)
	$(CC) -shared -o "lib$(NAME).so" $(OBJS)

# Create dirs
$(OBJ_DIRS):
	mkdir -p $@

# Build objects
$(OBJ)/%.o: $(NAME)/%.c $(NAME)/%.h
	$(CC) -c -fmessage-length=0 -fPIC -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o "$@" "$<"

# Print all sources
srcs:
	@echo $(C_SRCS) $(H_SRCS)

# Add debug parameters and compile
debug: CC += -DDEBUG -g
debug: all

# Clean build files
clean:
	rm -f lib$(NAME).so
	rm -rf $(OBJ)

# Shared library installation
install: all
	sudo cp -u lib$(NAME).so /usr/lib
	sudo cp --parents -u $(H_SRCS) /usr/include

uninstall:
	sudo rm -f /usr/lib/lib$(NAME).so
	sudo rm -rf /usr/include/$(NAME)

.PHONY: all clean install uninstall

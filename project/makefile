# Edit sources folder and objects folder name here
SRC=src
OBJ=obj

# Include dependencies here
LIB_NAME:=shared
LIB_PATH:=../$(LIB_NAME)
LIBS:=-L "$(LIB_PATH)" -l$(LIB_NAME)

# Setup
CC:=gcc
NAME:=$(shell basename $(shell cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd))
SRC_DIRS=$(shell find $(SRC) -type d)
OBJ_DIRS=$(patsubst $(SRC)%,$(OBJ)%,$(SRC_DIRS))
C_SRCS=$(shell find . -iname "*.c" | tr '\n' ' ')
H_SRCS=$(shell find . -iname "*.h" | tr '\n' ' ')
LIB_SRCS=$(patsubst .%,$(LIB_PATH)%,$(shell make --no-print-directory -C $(LIB_PATH) srcs | tr '\n' ' ')) 
OBJS=$(C_SRCS:./$(SRC)/%.c=$(OBJ)/%.o)

# All target
all: $(NAME).out

# Build project
$(NAME).out: $(LIB_PATH)/lib$(LIB_NAME).so $(OBJ_DIRS) $(OBJS)
	$(CC) -I$(LIB_PATH) -g -Wall -o "$(NAME).out" $(OBJS) $(LIBS)

# Build own shared library
$(LIB_PATH)/lib$(LIB_NAME).so: $(LIB_SRCS)
	make -C $(LIB_PATH)

# Create directories for objects
$(OBJ_DIRS):
	mkdir -p $@

# Build objects
$(OBJ)/%.o: $(SRC)/%.c
	$(CC) -I$(LIB_PATH) -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o "$@" "$<"

# Clean target
clean:
	rm -f $(NAME).out
	rm -rf $(OBJ)

.PHONY: all clean

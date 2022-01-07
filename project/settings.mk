# =========================[ Compilation variables ]========================= #

# Project name
NAME=$(shell cd . && pwd | xargs basename)

# Main function source file
MAIN=src/main.c

# Libraries
LIBS=

# Custom libraries' paths
SHARED_LIBPATHS=
STATIC_LIBPATHS=

# Compiler flags
CDEBUG=-Wall -DDEBUG -g
CRELEASE=-Wall -DNDEBUG

# ==========================[ Profiling variables ]========================== #

# Arguments when executing with start, memcheck or helgrind
ARGS=

# Valgrind flags
MEMCHECK_FLAGS=--track-origins=yes --log-file="memcheck-$(NAME).log"
HELGRIND_FLAGS=--log-file="helgrind-$(NAME).log"

# Libraries
LIBS=

# Custom libraries' paths
SHARED_LIBPATHS=
STATIC_LIBPATHS=

# Compiler flags
CDEBUG=-g -Wall -DDEBUG
CRELEASE=-O3 -Wall -DNDEBUG

# Arguments when executing with start, memcheck or helgrind
ARGS=

# Valgrind flags
MEMCHECK_FLAGS=--track-origins=yes
HELGRIND_FLAGS=

# Source files (*.c) to be excluded from tests compilation
TEST_EXCLUDE=src/main.c

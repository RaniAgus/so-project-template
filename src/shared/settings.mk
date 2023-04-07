# Libraries
LIBS=static commons

# Custom libraries' paths
SHARED_LIBPATHS=
STATIC_LIBPATHS=../static

# Compiler flags
CDEBUG=-g -Wall -DDEBUG
CRELEASE=-O3 -Wall -DNDEBUG

# Source files (*.c) to be excluded from tests compilation
TEST_EXCLUDE=

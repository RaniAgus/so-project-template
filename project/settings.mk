# [ Compilation variables ] #

# Libraries
LIBS=

# Custom libraries' paths
SHARED_LIBPATHS=
STATIC_LIBPATHS=

# Compiler flags
CDEBUG=-Wall -DDEBUG -g
CRELEASE=-O3 -Wall -DNDEBUG

# [ Profiling variables ] #

# Arguments when executing with start, memcheck or helgrind
ARGS=

# Valgrind flags
MEMCHECK_FLAGS=--track-origins=yes --log-file="memcheck.log"
HELGRIND_FLAGS=--log-file="helgrind.log"

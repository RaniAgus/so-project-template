# =========================[ Compilation variables ]========================= #

# Project name
NAME=$(shell cd . && pwd | xargs basename)

# Libraries
LIBS=

# Custom libraries' paths
LIBPATHS=

# Compiler flags
CDEBUG=-Wall -DDEBUG -g
CRELEASE=-O3 -Wall -DNDEBUG

# =========================[ Installation variables ]========================= #

# Path where the library will be installed
INST_LIB=/usr/local/lib
INST_H=/usr/local/include

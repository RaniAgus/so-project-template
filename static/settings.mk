# =========================[ Compilation variables ]========================= #

# Project name
NAME=$(shell cd . && pwd | xargs basename)

# Custom libraries' paths
LIBPATHS=

# Compiler flags
CDEBUG=-Wall -DDEBUG -g
CRELEASE=-Wall -DNDEBUG

# =========================[ Compilation variables ]========================= #

# Original project path
PROJ_PATH=../project

# Original project main function source file path (will be excluded from tests)
PROJ_MAIN=$(PROJ_PATH)/src/main.c

# Testing library
TEST_LIB=cspecs

# All libraries except 'readline', custom libraries' paths and compiled flags
# will be imported from PROJ_PATH

# ==========================[ Profiling variables ]========================== #

# Arguments when executing with start, memcheck or helgrind
TEST_ARGS=

# Valgrind flags
TEST_MEMCHECK_FLAGS=--track-origins=yes --log-file="memcheck.log"
TEST_HELGRIND_FLAGS=--log-file="helgrind.log"

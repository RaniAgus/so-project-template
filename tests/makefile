include settings.mk
include $(PROJ_PATH)/settings.mk

# ===========================[ Compilation rules ]=========================== #

# Testing libraries
TEST_LIBS=$(TEST_LIB) $(LIBS)

# Custom libraries' paths
TEST_SHARED_LIBPATHS=$(addprefix $(PROJ_PATH)/,$(SHARED_LIBPATHS))
TEST_STATIC_LIBPATHS=$(addprefix $(PROJ_PATH)/,$(STATIC_LIBPATHS))

# Set prerrequisites 
SRCS_C != find $(PROJ_PATH)/src/ -iname "*.c" -not -iwholename "$(PROJ_MAIN)"
TEST_SRCS_C != find src/ -iname "*.c"
SRCS_H != find src/ -iname "*.h"
TEST_SRCS_H != find src/ -iname "*.h"
DEPS = $(addsuffix /src,$(TEST_SHARED_LIBPATHS) $(TEST_STATIC_LIBPATHS))

# Set targets
TEST_BINDIR = bin
TEST_BIN = $(TEST_BINDIR)/$(TEST_NAME).out

# Set header files' directories to (-I)nclude
TEST_IDIRS = $(addsuffix /include,$(TEST_SHARED_LIBPATHS) $(TEST_STATIC_LIBPATHS) $(PROJ_PATH) .)

# Set library files' directories to (-L)ook
TEST_LIBDIRS = $(addsuffix /bin,$(TEST_SHARED_LIBPATHS) $(TEST_STATIC_LIBPATHS))

.PHONY: debug
debug: $(TEST_BIN)

$(TEST_BIN): $(SRCS_C) $(SRCS_H) $(TEST_SRCS_C) $(TEST_SRCS_H) | $(TEST_BINDIR)
	gcc $(CFLAGS) -o "$@" $^ $(TEST_IDIRS:%=-I%) $(TEST_LIBDIRS:%=-L%) $(TEST_LIBS:%=-l%)

$(TEST_BINDIR):
	mkdir -pv $@

.PHONY: clean
clean:
	-rm -rfv $(TEST_BIN)

.PHONY: watch
watch:
	while sleep 0.1; do \
		find src/ $(PROJ_PATH)/src/ $(PROJ_PATH)/include/ | entr -d make debug --no-print-directory; \
	done

# ============================[ Profiling rules ]============================ #

# Shared library files paths
LD_LIBRARY_PATH != echo $(addsuffix /bin,$(TEST_SHARED_LIBPATHS)) | tr ' ' ':'

.PHONY: start
start: debug ; export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH)
	valgrind --tool=none ./$(TEST_BIN) $(TEST_ARGS)

.PHONY: daemon
daemon:
	while sleep 0.1; do \
		find src/ include/ | entr -d make start --no-print-directory; \
	done

.PHONY: memcheck
memcheck: debug ; export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH)
	valgrind --leak-check=full $(TEST_MEMCHECK_FLAGS) ./$(TEST_BIN) $(TEST_ARGS)

.PHONY: helgrind
helgrind: debug ; export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH)
	valgrind --tool=helgrind $(TEST_HELGRIND_FLAGS) ./$(TEST_BIN) $(TEST_ARGS)

# ==================================[ Help ]================================== #

.PHONY: help
help:
	@echo "COMMANDS:"
	@echo "    make / make debug -- debug project using debug flags."
	@echo "    make clean        -- Remove generated files from file system."
	@echo "    make watch        -- Run 'make debug' when any file is modified."
	@echo "PROFILING COMMANDS:"
	@echo "    make start        -- Run using valgrind without any extra tool."
	@echo "    make daemon       -- Run 'make start' when any file is modified."
	@echo "    make memcheck     -- Run using valgrind memcheck tool."
	@echo "    make helgrind     -- Run using valgrind helgrind tool."

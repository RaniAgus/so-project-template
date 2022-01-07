include settings.mk

# Set prerrequisites
SRCS_C != find src/ -iname "*.c" -not -iwholename "$(MAIN)"
SRCS_H != find include/ -iname "*.h"
DEPS = $(addsuffix /src,$(SHARED_LIBPATHS) $(STATIC_LIBPATHS))

# Set targets
BINDIR = bin
BIN = $(BINDIR)/$(NAME).out
OBJS = $(patsubst src/%.c,obj/%.o,$(SRCS_C))
OBJDIRS = $(dir $(OBJS))

# Set header files' directories to (-I)nclude
IDIRS = $(addsuffix /include,$(SHARED_LIBPATHS) $(STATIC_LIBPATHS) .)

# Set library files' directories to (-L)ook
LIBDIRS = $(addsuffix /bin,$(SHARED_LIBPATHS) $(STATIC_LIBPATHS))

# ===========================[ Compilation rules ]=========================== #

.PHONY: debug
debug: CFLAGS = $(CDEBUG)
debug: $(BIN)

.PHONY: release
release: CFLAGS = $(CRELEASE)
release: $(BIN)

$(BIN): $(MAIN) $(OBJS) | $(BINDIR)
	gcc $(CFLAGS) -o "$@" $^ $(IDIRS:%=-I%) $(LIBDIRS:%=-L%) $(LIBS:%=-l%)

obj/%.o: src/%.c $(SRCS_H) $(DEPS) | $(OBJDIRS)
	gcc $(CFLAGS) -c -o "$@" $< $(IDIRS:%=-I%)

$(BINDIR) $(OBJDIRS):
	mkdir -pv $@

.PHONY: clean
clean:
	-rm -rfv $(OBJS) $(BIN)

.PHONY: watch
watch:
	while true; do \
		find src/ include/ | entr -d make debug --no-print-directory; \
	done

# ============================[ Profiling rules ]============================ #

# Shared library files paths
LD_LIBRARY_PATH != echo $(addsuffix /bin,$(SHARED_LIBPATHS)) | tr ' ' ':'

.PHONY: start
start: debug ; export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH)
	valgrind --tool=none ./$(BIN) $(ARGS)

.PHONY: demon
demon:
	while true; do \
		find src/ include/ | entr -d make start --no-print-directory; \
	done

.PHONY: memcheck
memcheck: debug ; export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH)
	valgrind --leak-check=full $(MEMCHECK_FLAGS) ./$(BIN) $(ARGS)

.PHONY: helgrind
helgrind: debug ; export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH)
	valgrind --tool=helgrind $(HELGRIND_FLAGS) ./$(BIN) $(ARGS)

# ==================================[ Help ]================================== #

.PHONY: help
help:
	@echo "COMMANDS:"
	@echo "    make / make debug -- Build project using debug flags."
	@echo "    make release      -- Build project using release flags."
	@echo "    make clean        -- Remove generated files from file system."
	@echo "    make watch        -- Run 'make debug' when any file is modified."
	@echo "    make start        -- Run using valgrind without any extra tool."
	@echo "    make demon        -- Run 'make start' when any file is modified."
	@echo "    make memcheck     -- Run using valgrind memcheck tool."
	@echo "    make helgrind     -- Run using valgrind helgrind tool."

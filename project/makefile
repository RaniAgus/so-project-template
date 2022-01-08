include settings.mk

# ===========================[ Compilation rules ]=========================== #

# Executable file
BINDIR = bin
BIN = $(BINDIR)/$(NAME).out

.PHONY: debug
debug: CFLAGS = $(CDEBUG)
debug: $(BIN)

.PHONY: release
release: CFLAGS = $(CRELEASE)
release: $(BIN)

.PHONY: clean
clean:
	-rm -rf $(OBJDIRS) $(BINDIR)

.PHONY: watch
watch:
	while sleep 0.1; do \
		find src/ include/ | entr -d make debug --no-print-directory; \
	done

# ============================[ Profiling rules ]============================ #

# Shared library files paths
LD_LIBRARY_PATH != echo $(addsuffix /bin,$(SHARED_LIBPATHS)) | tr ' ' ':'

.PHONY: start
start: debug 
	export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH); \
	valgrind --tool=none ./$(BIN) $(ARGS)

.PHONY: daemon
daemon:
	while sleep 0.1; do \
		find src/ include/ | entr -d make start --no-print-directory; \
	done

.PHONY: memcheck
memcheck: debug 
	export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH); \
	valgrind --leak-check=full $(MEMCHECK_FLAGS) ./$(BIN) $(ARGS)

.PHONY: helgrind
helgrind: debug 
	export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH); \
	valgrind --tool=helgrind $(HELGRIND_FLAGS) ./$(BIN) $(ARGS)

# ==================================[ Help ]================================== #

.PHONY: help
help:
	@echo "COMPILATION COMMANDS:"
	@echo "    make / make debug -- Build project using debug flags."
	@echo "    make release      -- Build project using release flags."
	@echo "    make clean        -- Remove generated files from file system."
	@echo "    make watch        -- Run 'make debug' when any file is modified."
	@echo "PROFILING COMMANDS:"
	@echo "    make start        -- Run using valgrind without any extra tool."
	@echo "    make daemon       -- Run 'make start' when any file is modified."
	@echo "    make memcheck     -- Run using valgrind memcheck tool."
	@echo "    make helgrind     -- Run using valgrind helgrind tool."

# =============================[ Private rules ]============================= #

# Set prerrequisites
SRCS_C != find src/ -iname "*.c"
SRCS_H != find include/ -iname "*.h"

# Set targets
OBJS = $(patsubst src/%.c,obj/%.o,$(SRCS_C))
DEPS = $(patsubst src/%.c,obj/%.d,$(SRCS_C))
OBJDIRS = $(dir $(OBJS))

# Set header files' directories to (-I)nclude
IDIRS = $(addsuffix /include,$(SHARED_LIBPATHS) $(STATIC_LIBPATHS) .)

# Set library files' directories to (-L)ook
LIBDIRS = $(addsuffix /bin,$(SHARED_LIBPATHS) $(STATIC_LIBPATHS))

$(BIN): $(OBJS) | $(BINDIR)
	gcc $(CFLAGS) -o "$@" $^ $(IDIRS:%=-I%) $(LIBDIRS:%=-L%) $(LIBS:%=-l%)

$(BINDIR) $(OBJDIRS):
	mkdir -p $@

include $(DEPS)

obj/%.o: src/%.c include/%.h | $(OBJDIRS)
	gcc $(CFLAGS) -c -o "$@" $< $(IDIRS:%=-I%)

obj/%.o: src/%.c | $(OBJDIRS)
	gcc $(CFLAGS) -c -o "$@" $< $(IDIRS:%=-I%)

# https://gnu.org/software/make/manual/html_node/Automatic-Prerequisites.html
obj/%.d: src/%.c | $(OBJDIRS)
	@set -e; \
		gcc -MM -MP -MF"$@" $< $(IDIRS:%=-I%); \
  	sed -i 's,\($*\)\.o[ :]*,$(dir $@)\1.o $@ : ,g' $@

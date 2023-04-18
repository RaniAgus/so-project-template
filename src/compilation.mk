# Check if tests folder exists
ifneq ($(wildcard tests/*),)
TESTS_ENABLED=1
endif

# Set prerrequisites
SRCS_C += $(shell find src/ -iname "*.c")
SRCS_H += $(shell find src/ -iname "*.h")
DEPS = $(foreach SHL,$(SHARED_LIBPATHS),$(SHL:%=%/bin/lib$(notdir $(SHL)).so)) \
	$(foreach STL,$(STATIC_LIBPATHS),$(STL:%=%/bin/lib$(notdir $(STL)).a))

# Set test prerrequisites
ifeq ($(TESTS_ENABLED),1)
TESTS_C += $(shell find tests/ -iname "*.c")
TESTS_H += $(shell find tests/ -iname "*.h")
endif

# Set header paths to (-I)nclude
IDIRS += $(addsuffix /src,$(SHARED_LIBPATHS) $(STATIC_LIBPATHS) .)

# Set library paths to (-L)ook
LIBDIRS = $(addsuffix /bin,$(SHARED_LIBPATHS) $(STATIC_LIBPATHS))

# Set shared library paths to be found in runtime (-rpath)
RUNDIRS = $(SHARED_LIBPATHS:%=$(shell cd . && pwd)/%/bin)

# Set intermediate objects
OBJS = $(patsubst src/%.c,obj/%.o,$(SRCS_C))

# Set test intermediate objects
ifeq ($(TESTS_ENABLED),1)
TEST_OBJS = $(TESTS_C) $(filter-out $(TEST_EXCLUDE), $(SRCS_C))
endif

# Set binary targets
BIN = bin/$(call filename,$(shell cd . && pwd | xargs basename))

# Set test binary targets
ifeq ($(TESTS_ENABLED),1)
TEST = bin/$(shell cd . && pwd | xargs basename)_tests.out
endif

.PHONY: all
all: CFLAGS = $(CDEBUG)
all: $(BIN) $(TEST)

.PHONY: release
release: CFLAGS = $(CRELEASE)
release: clean $(BIN) $(TEST)

.PHONY: clean
clean:
	-rm -rfv obj bin

.PHONY: watch
watch:
	@test $(shell which entr) || entr
	while sleep 0.1; do \
		find src/ | entr -d make all --no-print-directory; \
	done

$(BIN): $(OBJS) | $(dir $(BIN))
	$(call compile_bin)

obj/%.o: src/%.c $(SRCS_H) $(DEPS) | $(dir $(OBJS))
	$(call compile_objs)

ifeq ($(TESTS_ENABLED),1)
$(TEST): $(TEST_OBJS) | $(dir $(TEST))
	gcc $(CFLAGS) -o "$@" $^ $(IDIRS:%=-I%) $(LIBDIRS:%=-L%) $(RUNDIRS:%=-Wl,-rpath,%) $(LIBS:%=-l%) -lcspecs
endif

.SECONDEXPANSION:
$(DEPS): $$(shell find $$(patsubst %bin/,%src/,$$(dir $$@)) -iname "*.c" -or -iname "*.h")
	make --no-print-directory -C $(patsubst %bin/,%,$(dir $@)) 3>&1 1>&2 2>&3 | sed -E 's,(src/|tests/)[^ ]+\.(c|h)\:,$(patsubst %bin/,%,$(dir $@))&,' 3>&2 2>&1 1>&3

$(sort $(dir $(BIN) $(OBJS))):
	mkdir -pv $@

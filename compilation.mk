# Set prerrequisites
SRCS_C += $(shell find src/ -iname "*.c")
SRCS_H += $(shell find include/ -iname "*.h")
DEPS += $(shell find $(addsuffix /src,$(LIBPATHS)) -iname "*.c") \
 $(shell find $(addsuffix /include,$(LIBPATHS)) -iname "*.h")

# Set header files' directories to (-I)nclude
IDIRS += $(addsuffix /include,$(LIBPATHS) .)

# Set library files' directories to (-L)ook
LIBDIRS = $(addsuffix /bin,$(LIBPATHS))

# Set intermediate objects
OBJS = $(patsubst src/%.c,obj/%.o,$(SRCS_C))

# Set binary target
BIN = bin/$(call filename,$(shell cd . && pwd | xargs basename))

.PHONY: debug
debug: CFLAGS = $(CDEBUG)
debug: $(BIN)

.PHONY: release
release: CFLAGS = $(CRELEASE)
release: $(BIN)

.PHONY: clean
clean:
	-rm -rfv obj bin

.PHONY: watch
watch:
	while sleep 0.1; do \
		find src/ include/ | entr -d make debug --no-print-directory; \
	done

$(BIN): $(OBJS) | $(dir $(BIN))
	$(call compile_bin)

obj/%.o: src/%.c $(SRCS_H) $(DEPS) | $(dir $(OBJS))
	$(call compile_objs)

$(dir $(BIN) $(OBJS)):
	mkdir -pv $@

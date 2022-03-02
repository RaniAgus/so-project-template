include settings.mk

LIBPATHS = $(SHARED_LIBPATHS) $(STATIC_LIBPATHS)
filename = $(1).out

PROJ_C = $(filter-out $(PROJ_PATH)/src/$(PROJ_MAIN),$(shell find $(PROJ_PATH) -iname "*.c"))
PROJ_H = $(shell find $(PROJ_PATH) -iname "*.h")
DEPS = $(PROJ_C) $(PROJ_H)
IDIRS = $(addsuffix /include,$(PROJ_PATH))

define compile_bin
	gcc $(CFLAGS) -o "$@" $^ $(PROJ_C) $(IDIRS:%=-I%) $(LIBDIRS:%=-L%) $(LIBS:%=-l%)
endef

define compile_objs
	gcc $(CFLAGS) -c -o "$@" $< $(IDIRS:%=-I%)
endef

include ../compilation.mk
include ../execution.mk

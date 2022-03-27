include settings.mk

################################################################################

filename = $(1).out

# Include source files from the main project
SRCS_C = $(filter-out $(EXCLUDE:%=$(PROJ_PATH)/src/%),$(shell find $(PROJ_PATH)/src -iname "*.c"))
SRCS_H = $(shell find $(PROJ_PATH)/include -iname "*.h")
IDIRS = $(addsuffix /include,$(PROJ_PATH))

define compile_bin
	gcc $(CFLAGS) -o "$@" $^ $(PROJ_C) $(IDIRS:%=-I%) $(LIBDIRS:%=-L%) $(LIBS:%=-l%)
endef

define compile_objs
	gcc $(CFLAGS) -c -o "$@" $< $(IDIRS:%=-I%)
endef

################################################################################

include ../compilation.mk

################################################################################

include ../execution.mk

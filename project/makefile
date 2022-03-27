include settings.mk

################################################################################

filename = $(1).out

define compile_bin
	gcc $(CFLAGS) -o "$@" $^ $(IDIRS:%=-I%) $(LIBDIRS:%=-L%) $(LIBS:%=-l%)
endef

define compile_objs
	gcc $(CFLAGS) -c -o "$@" $< $(IDIRS:%=-I%)
endef

################################################################################

include ../compilation.mk

################################################################################

include ../execution.mk

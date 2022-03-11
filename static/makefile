include settings.mk

################################################################################

filename = lib$(1).a

define compile_bin
	ar rcs -o "$@" $^
endef

define compile_objs
	gcc $(CFLAGS) -c -o "$@" $< $(IDIRS:%=-I%)
endef

################################################################################

include ../compilation.mk

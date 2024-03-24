include settings.mk

################################################################################

filename = lib$(1).a

define compile_bin
	$(AR) $(ARFLAGS) -o "$@" $^
endef

define compile_objs
	$(CC) $(CFLAGS) -fPIC -c -o "$@" $< $(IDIRS:%=-I%)
endef

################################################################################

include ../compilation.mk
include ../testing.mk

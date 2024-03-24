include settings.mk

################################################################################

filename = $(1)

define compile_bin
	$(CC) $(CFLAGS) -o "$@" $^ $(IDIRS:%=-I%) $(LIBDIRS:%=-L%) $(RUNDIRS:%=-Wl,-rpath,%) $(LIBS:%=-l%)
endef

define compile_objs
	$(CC) $(CFLAGS) -c -o "$@" $< $(IDIRS:%=-I%)
endef

################################################################################

include ../compilation.mk

################################################################################

include ../execution.mk

################################################################################

include ../testing.mk

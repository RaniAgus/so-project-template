include settings.mk

################################################################################

filename = lib$(1).so

define compile_bin
	$(CC) $(CFLAGS) -shared -o "$@" $^ $(LIBDIRS:%=-L%) $(RUNDIRS:%=-Wl,-rpath,%) $(LIBS:%=-l%)
endef

define compile_objs
	$(CC) $(CFLAGS) -fPIC -c -o "$@" $< $(IDIRS:%=-I%)
endef

################################################################################

include ../compilation.mk

################################################################################

include ../testing.mk

################################################################################

include ../installation.mk

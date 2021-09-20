PROJECTS=project
LIBS=
TESTS=

all: $(PROJECTS)

$(PROJECTS): $(LIBS)
	$(MAKE) -C $@ all

$(LIBS):
	$(MAKE) -C $@ all

clean:
	$(foreach P, $(LIBS) $(PROJECTS) $(TESTS), $(MAKE) -C $P clean;)

release: test
	$(foreach P, $(LIBS) $(PROJECTS), $(MAKE) -C $P release;)

test:
	$(foreach P, $(TESTS), $(MAKE) -C $P start;)

.PHONY: all $(PROJECTS) $(LIBS) clean release test

%:
	@echo $($@) | tr ' ' '\n'
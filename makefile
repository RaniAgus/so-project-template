PROJECTS=./project
LIBS=
TESTS=

all: $(PROJECTS)

$(PROJECTS): $(LIBS)
	$(MAKE) -C $@

$(LIBS):
	$(MAKE) -C $@

clean:
	$(foreach PROJ, $(LIBS) $(PROJECTS) $(TESTS), $(MAKE) -C $(PROJ) clean;)

release: test
	$(foreach PROJ, $(LIBS) $(PROJECTS), $(MAKE) -C $(PROJ) release;)

test:
	$(foreach PROJ, $(TESTS), $(MAKE) -C $(PROJ) start;)

.PHONY: all $(PROJECTS) $(LIBS) $(TESTS) clean release test

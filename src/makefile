PROJECTS=./project
LIBS=./shared ./static

all: $(PROJECTS)

$(PROJECTS): $(LIBS)
	$(MAKE) -C $@

$(LIBS):
	$(MAKE) -C $@

clean:
	$(foreach PROJ, $(LIBS) $(PROJECTS), $(MAKE) -C $(PROJ) clean;)

release:
	$(foreach PROJ, $(LIBS) $(PROJECTS), $(MAKE) -C $(PROJ) release;)

test:
	$(foreach PROJ, $(LIBS) $(PROJECTS), $(MAKE) -C $(PROJ) test;)

.PHONY: all $(PROJECTS) $(LIBS) clean release test

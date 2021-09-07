PROJECTS=project
LIBS=

all: $(PROJECTS)

$(PROJECTS): $(LIBS)
	$(MAKE) -C $@ all

$(LIBS):
	$(MAKE) -C $@ all

clean:
	$(foreach P, $(LIBS) $(PROJECTS), $(MAKE) -C $P clean;)

release:
	$(foreach P, $(LIBS) $(PROJECTS), $(MAKE) -C $P release;)

.PHONY: all $(PROJECTS) $(LIBS) clean release
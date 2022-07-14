LD_LIBRARY_PATH != echo $(addsuffix /bin,$(SHARED_LIBPATHS)) | tr ' ' ':'

.PHONY: start
start: all
	export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH); \
	valgrind --tool=none ./$(BIN) $(ARGS)

.PHONY: daemon
daemon:
	@test $(shell which entr) || entr
	while sleep 0.1; do \
		find src/ include/ | entr -d make start --no-print-directory; \
	done

.PHONY: memcheck
memcheck: all
	export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH); \
	valgrind --leak-check=full $(MEMCHECK_FLAGS) ./$(BIN) $(ARGS)

.PHONY: helgrind
helgrind: all
	export LD_LIBRARY_PATH=$(LD_LIBRARY_PATH); \
	valgrind --tool=helgrind $(HELGRIND_FLAGS) ./$(BIN) $(ARGS)

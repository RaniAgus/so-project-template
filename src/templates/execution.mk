.PHONY: start
start: debug
	valgrind --tool=none ./$(BIN) $(ARGS)

.PHONY: daemon
daemon:
	@test $(shell which entr) || entr
	while sleep 0.1; do \
		find src/ | entr -d make start --no-print-directory; \
	done

.PHONY: memcheck
memcheck: debug
	valgrind --leak-check=full $(MEMCHECK_FLAGS) ./$(BIN) $(ARGS)

.PHONY: helgrind
helgrind: debug
	valgrind --tool=helgrind $(HELGRIND_FLAGS) ./$(BIN) $(ARGS)

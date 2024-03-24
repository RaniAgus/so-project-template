.PHONY: start
start: debug
	valgrind --tool=none ./$(BIN) $(ARGS)

.PHONY: memcheck
memcheck: debug
	valgrind --leak-check=full $(MEMCHECK_FLAGS) ./$(BIN) $(ARGS)

.PHONY: helgrind
helgrind: debug
	valgrind --tool=helgrind $(HELGRIND_FLAGS) ./$(BIN) $(ARGS)

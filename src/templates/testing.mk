ifeq ($(TESTS_ENABLED),1)
.PHONY: test
test: $(TEST)
	valgrind --tool=none ./$(TEST)

.PHONY: test-daemon
test-daemon:
	@test $(shell which entr) || entr
	while sleep 0.1; do \
		find tests/ src/ | entr -d make test --no-print-directory; \
	done

.PHONY: test-memcheck
test-memcheck: $(TEST)
	valgrind --leak-check=full $(MEMCHECK_FLAGS) ./$(TEST)

.PHONY: test-helgrind
test-helgrind: $(TEST)
	valgrind --tool=helgrind $(HELGRIND_FLAGS) ./$(TEST)
endif

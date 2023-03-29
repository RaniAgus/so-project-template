ifeq ($(CSPEC_INSTALLED),1)
.PHONY: test
test: all
	valgrind --tool=none ./$(TEST)

.PHONY: test-daemon
test-daemon:
	@test $(shell which entr) || entr
	while sleep 0.1; do \
		find tests/ src/ | entr -d make test --no-print-directory; \
	done

.PHONY: test-memcheck
test-memcheck: all
	valgrind --leak-check=full $(MEMCHECK_FLAGS) ./$(TEST)

.PHONY: test-helgrind
test-helgrind: all
	valgrind --tool=helgrind $(HELGRIND_FLAGS) ./$(TEST)
endif

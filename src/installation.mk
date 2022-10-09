PATH_TO_LIB=/usr/lib
PATH_TO_INCLUDE=/usr/include

.PHONY: install
install: release
	sudo cp -v $(BIN) $(PATH_TO_LIB)
	sudo cp -v $(SRCS_H) $(PATH_TO_INCLUDE)

.PHONY: uninstall
uninstall:
	sudo rm -fv $(patsubst bin/%,$(PATH_TO_LIB)/%,$(BIN))
	sudo rm -fv $(patsubst src/%,$(PATH_TO_INCLUDE)/%,$(SRCS_H))

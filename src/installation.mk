PATH_TO_LIB=/usr/local/lib
PATH_TO_INCLUDE=/usr/local/include

.PHONY: install
install: release
	sudo cp -uva $(dir $(BIN)). $(PATH_TO_LIB)
	sudo cp -uva include/. $(PATH_TO_INCLUDE)

.PHONY: uninstall
uninstall:
	sudo rm -fv $(patsubst bin/%,$(PATH_TO_LIB)/%,$(BIN))
	sudo rm -fvr $(patsubst include/%,$(PATH_TO_INCLUDE)/%,$(SRCS_H))

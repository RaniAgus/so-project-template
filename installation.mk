LIB_PATH=/usr/local/lib
INCLUDE_PATH=/usr/local/include

.PHONY: install
install: release
	sudo cp -uva $(dir $(BIN)). $(LIB_PATH)
	sudo cp -uva include/. $(INCLUDE_PATH)

.PHONY: uninstall
uninstall:
	sudo rm -fv $(patsubst bin/%,$(LIB_PATH)/%,$(BIN))
	sudo rm -fvr $(patsubst include/%,$(INCLUDE_PATH)/%,$(SRCS_H))

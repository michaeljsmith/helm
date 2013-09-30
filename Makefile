CXX=clang++
#CXX=g++
CXXFLAGS=-g --std=c++11 -Werror -Weverything -pedantic -Wno-c++98-compat -Wno-padded -Wno-float-equal -Wno-global-constructors -Wno-exit-time-destructors
#LDFLAGS=-g --std=c++11 --stdlib=libc++ -Werror -Weverything -lpthread -lboost_signals-mt -lcurses

# Basic configuration variables.
module_name=helm
module_source_dir=src

.PHONY: default clean run

$(module_name): src/main.cpp src/quadtree.h
	$(CXX) $(CXXFLAGS) $(LDFLAGS) -o $(module_name) src/main.cpp

run: $(module_name)
	gdb $(module_name) -batch -x scripts/gdbExec | scripts/formatBt

clean:
	rm -rf $(config_prefix)

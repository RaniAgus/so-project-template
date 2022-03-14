#!/usr/bin/env python3

import sys
import os


def main(dir: str) -> None:
    os.chdir(dir)
    with open('makefile', 'r') as file:
        for line in file:
            parse_line(line.strip())


def parse_line(line: str) -> None:
    if line.startswith('include ../'):
        include(line)
    else:
        print(line)


def include(line: str) -> None:
    _, filename = line.split(' ')
    with open(filename, 'r') as file:
        print(file.read())


if __name__ == "__main__":
    main(sys.argv[1])

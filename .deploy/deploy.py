#!/usr/bin/env python3

import os, sys

def __main__(dir):
  os.chdir(dir)
  with open('./makefile', 'r') as file:
    for line in file:
      parse_line(line.strip())

def parse_line(line):
  if line.startswith('include') and not 'settings' in line:
    include(line)
  else:
    print(line)

def include(line):
  _, filename = line.split(' ')
  with open(filename, 'r') as file:
    print(file.read())

__main__(sys.argv[1])

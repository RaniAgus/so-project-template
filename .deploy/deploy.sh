#!/usr/bin/env bash

declare -a projects=("project" "shared" "static" "tests")

for i in "${projects[@]}"
do
   make -C "../$i" clean
   cp -R "../$i" "$i"
   ./deploy.py "../$i" | tee "$i/makefile"
   tar -czvf "$i.tar.gz" "$i"
   rm -rf "$i"
done

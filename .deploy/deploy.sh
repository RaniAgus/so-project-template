#!/bin/bash -x

declare -a projects=("project" "shared" "static" "tests")

teardown() {
   rm -rf "${projects[@]}"
   exit
}

for i in "${projects[@]}"
do
   make -C "../$i" clean
   cp -R "../$i" "$i"
   ./deploy.py "../$i" | tee "$i/makefile"
   (
      cd "$i" || exit 1
      git init || exit 1
      git add -A || exit 1
      git commit -m "$i template" || exit 1
      git tag v3.0.0 || exit 1
      git tag latest || exit 1
      git push -f https://github.com/RaniAgus/c-"$i"-template.git main || exit 1
      git push -f --tags https://github.com/RaniAgus/c-"$i"-template.git || exit 1
   ) || teardown
done

teardown

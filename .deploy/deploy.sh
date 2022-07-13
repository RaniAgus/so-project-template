#!/bin/bash -x

declare -a projects=("project" "shared" "static" "tests")

push() {
   cd $1
   git init
   git add -A
   git commit -m "template"
   git tag v3.0.0
   git tag latest
   git push -f https://github.com/RaniAgus/c-${1}-template.git main
   git push -f --tags https://github.com/RaniAgus/c-${1}-template.git
   cd -
}

teardown() {
   rm -rf ${projects[@]} *.tar.gz
}

for i in "${projects[@]}"
do
   make -C "../$i" clean
   cp -R "../$i" "$i"
   ./deploy.py "../$i" | tee "$i/makefile"
   push "$i" || teardown
done

teardown

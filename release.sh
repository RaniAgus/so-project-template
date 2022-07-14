#!/bin/bash -x

TAG="v3.0.0"
TEMPLATES=('project' 'static' 'shared' 'tests')

SRC="src"
DIST="dist"

rm -rf "$DIST"
mkdir -v "$DIST"

for template in "${TEMPLATES[@]}"
do
   make -C "$SRC/$template" clean
   cp -R "$SRC/$template" "$DIST/$template"
   ./makegen.py "$SRC/$template" | tee "$DIST/$template/makefile"
   (
      cd "$DIST/$template" || exit 1
      git init || exit 1
      git add -A || exit 1
      git commit -m "$template template" || exit 1
      git tag "$TAG" || exit 1
      git tag latest || exit 1
      git push -f https://github.com/RaniAgus/c-"$template"-template.git main || exit 1
      git push -f --tags https://github.com/RaniAgus/c-"$template"-template.git || exit 1
   ) || exit 1
done

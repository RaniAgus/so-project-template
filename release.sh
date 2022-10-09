#!/bin/bash -x

TAG=${1:-"SNAPSHOT"}
TEMPLATES=('project' 'static' 'shared')

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
      cd "$DIST" || exit 1
      tar -czf "$template-$TAG.tar.gz" "$template"
      md5sum "$template-$TAG.tar.gz" > "$template-$TAG.tar.gz.md5"
      sha1sum "$template-$TAG.tar.gz" > "$template-$TAG.tar.gz.sha1"
      rm -rf "$template"
   )
done

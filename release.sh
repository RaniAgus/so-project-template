#!/bin/bash -x

TAG=$1
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
   tar -czf "$DIST/$template-$TAG.tar.gz" "$DIST/$template"
   md5sum "$DIST/$template-$TAG.tar.gz" > "$DIST/$template-$TAG.tar.gz.md5"
   sha1sum "$DIST/$template-$TAG.tar.gz" > "$DIST/$template-$TAG.tar.gz.sha1"
   rm -rf "$DIST/$template"
done

#!/bin/bash
REPONAME="RaniAgus/so-project-template"
TEMPLATENAME="${1:?}"

read -p "$TEMPLATENAME name: ($TEMPLATENAME) " PROJNAME

wget -qO- https://github.com/$REPONAME/releases/latest/download/$TEMPLATENAME.tar.gz\
 | tar -xvzf - --strip-components 1 --one-top-level=${PROJNAME:-$TEMPLATENAME}
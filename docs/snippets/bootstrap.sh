#!/bin/sh

# crear una carpeta con el nombre del proyecto
mkdir project && cd project

# descargar el template
wget -qO- https://github.com/RaniAgus/so-project-template/releases/download/v3.1.1/project-v3.1.1.tar.gz \
  | tar -xzvf - --strip-components 1

# compilar
make

# ejecutar
./bin/project.out

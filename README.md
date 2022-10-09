# so-project-template
Template para facilitar la creación de proyectos en C con una biblioteca
compartida.

## Tan simple como...

```bash
# crear una carpeta con el nombre del proyecto (ej: "project")
mkdir project && cd project

# descargar el template
wget -qO- https://github.com/RaniAgus/so-project-template/releases/download/v3.1.1/project-v3.1.1.tar.gz \
  | tar -xzvf - --strip-components 1

# compilar con make
make

# ejecutar ./bin/{nombre}.out
./bin/project.out
```

Para agregar bibliotecas, compartir código entre proyectos, importar en
Eclipse o Visual Studio Code y otras features, consultar la
[guía de uso](https://raniagus.github.io/so-project-template-guide/).


## Contacto

Si encontrás algun error en los makefiles o tenés alguna sugerencia, ¡no dudes
en abrir un issue en este repositorio!

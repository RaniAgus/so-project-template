# so-project-template

Templates para facilitar la creación de proyectos en Lenguaje C.

![meme](https://raniagus.github.io/so-project-template/img/meme.png)

## Tan simple como...

```bash
# crear una carpeta con el nombre del proyecto
mkdir mi-nuevo-proyecto && cd mi-nuevo-proyecto

# descargar el template
wget -qO- https://github.com/RaniAgus/so-project-template/releases/download/v4.0.1/project-v4.0.1.tar.gz \
  | tar -xzvf - --strip-components 1

# compilar con make
make

# ejecutar
./bin/mi-nuevo-proyecto.out
```

Para agregar bibliotecas, compartir código entre proyectos, importar en
Eclipse o Visual Studio Code y otras features, consultar la
[guía de uso](https://raniagus.github.io/so-project-template/).


## Contacto

Si encontrás algun error en los makefiles o tenés alguna sugerencia, ¡no dudes
en abrir un issue en este repositorio!

# Importar una biblioteca

## Agregar al workspace

Al igual que con los demás, nos iremos a
`Archivo > Agregar carpeta al área de trabajo...` y seleccionaremos **la carpeta
de la biblioteca**. Nos va a quedar algo parecido a esto:

![static-01](/img/code/static-01.png)

## Configurar la compilación

Primero, debemos modificar el archivo `tasks.json` para crear
[la misma tarea del proyecto](./project.md), salvo que en este caso le vamos a
poner el label `make-static` para poder diferenciarla:

<<< @/snippets/guia/code/static/tasks.json{7}

## Configurar el `includePath`

[Al igual que para el proyecto](./include.md), vamos a crear un archivo
`c_cpp_properties.json` con el `includePath`:

<<< @/snippets/guia/code/project/c_cpp_properties.json{5-7}

Pero, además de esto, debemos editar el `includePath` **del proyecto que usa la
biblioteca** para que el autocompletado reconozca las funciones que se
encuentran allí:

<<< @/snippets/guia/code/static/c_cpp_properties.json{7}


¡Y listo! Ya podemos continuar con el tutorial:
- [Regresar al tutorial de static libraries](../static-libraries.md#agregar-una-static-library-en-un-proyecto-existente).
- [Regresar al tutorial de shared libraries](../shared-libraries.md#agregar-una-shared-library-en-un-proyecto-existente).

# so-project-template
Template para facilitar la creación de proyectos en C con una biblioteca 
compartida.

![image](https://user-images.githubusercontent.com/39303639/148606688-2dac8b15-d90f-4e01-aef4-3a25a309c927.png)

## Features

Todos los makefiles:

✔️ Compilan solamente los archivos fuente necesarios.

✔️ Permiten el uso de subcarpetas para poder estructurar el proyecto de forma
más organizada.

✔️ Se pueden importar desde Eclipse, CLion, VSCode o cualquier editor de texto 
u entorno de desarrollo.

✔️ Permiten que el repo se pueda desplegar en una VM Server usando el script 
[so-deploy](https://github.com/sisoputnfrba/so-deploy).

✔️ No requieren que se especifique el nombre del proyecto al que pertenecen 
(alcanza con copiar la carpeta correspondiente y modificar su nombre para 
configurar el nombre del proyecto).

✔️ Permite configurar por separado flags de debug y release para `gcc`.

✔️ Incluyen reglas para observar cambios en los archivos y recompilar 
automáticamente.

✔️ El proyecto de `static` library permite compartir código sin necesidad de 
configurar `LD_LIBRARY_PATH`. Para saber más info sobre static vs shared 
libraries, te recomiendo ver
[este video](https://www.youtube.com/watch?v=JbHmin2Wtmc).

✔️ En caso de que tu TP también requiera utilizar la interfaz de una `shared` 
library, el mismo incluye reglas para instalarla y desinstalarla.

Además, el makefile del proyecto:

✔️ Incluye ejecución con Valgrind con las herramientas Nulgrind, Memcheck y 
Helgrind.

✔️ Incluye reglas para observar cambios en los archivos y, además de recompilar,
ejecutar automáticamente (similar a herramientas como 
[nodemon](https://www.npmjs.com/package/nodemon)).

## Guía de uso

La guía de uso se encuentra en la 
[wiki de este repo](https://github.com/RaniAgus/so-project-template/wiki/Gu%C3%ADa-de-uso).

## Contacto

Si encontrás algun error en los makefiles o tenés alguna sugerencia, ¡no dudes 
en abrir un issue en este repositorio!


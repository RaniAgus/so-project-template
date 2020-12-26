# utnso-project
Template para facilitar la creación de proyectos en C con una biblioteca compartida.

## Uso

Hay un ejemplo de uso en [este repo](https://github.com/RaniAgus/utnso-project-example). 

Ambos makefiles:

✔️ Compilan solamente las dependencias necesarias (incluso se verifica si la shared library está actualizada)

✔️ Permiten el uso de subcarpetas

✔️ Se pueden importar desde Eclipse, CLion, VSCode o cualquier editor de texto u entorno de desarrollo

✔️ Permiten que el repo se pueda deployar usando el script [so-deploy](https://github.com/sisoputnfrba/so-deploy)

✔️ No requieren que se especifique el nombre del proyecto al que pertenecen (alcanza con copiar la carpeta `example/` y modificar su nombre para configurar el nombre del proyecto)

Además, se incluye:

✔️ Un script para correr cada módulo, incluso con gdb o valgrind (memcheck o helgrind), configurando automáticamente `LD_LIBRARY_PATH` antes de cada ejecución. Para ejecutarlo se debe ingresar:

```
./run.sh [OPTION] [MODULE] [ARGS]
``` 
- `[OPTION]`: Es opcional. Puede ser `valgrind`, `helgrind` o `gdb`.
- `[MODULE]`: Es el nombre del proyecto a correr, en este caso `project`.
- `[ARGS]`: Son los parámetros que se le pasan a la función `main()`.

## Requerimientos

Ambos makefiles y el script `run.sh` funcionan bajo la siguiente estructura, adaptada para que [so-deploy](https://github.com/sisoputnfrba/so-deploy) funcione:
```
.
│  
└─── proyecto1/  
|     └─── src/  
|     └─── makefile  
└─── proyecto2/  
|     └─── src/  
|     └─── makefile  
└─── ...
└─── proyectoN/  
|     └─── src/  
|     └─── makefile  
└─── shared/  
|     └─── shared/  
|     └─── makefile
└─── run.sh  
```
- Para la shared library es **obligatorio** que tanto la carpeta con el nombre del mismo como la subcarpeta en donde se encuentran los `*.c` y `*.h` tengan el mismo nombre. Además, cada proyecto debe tener configurada correctamente la variable `LIB_NAME` con el nombre de la carpeta de la shared library (ídem para la variable `SHARED_NAME` del script). El nombre por defecto de la biblioteca es `shared`.
- Para cada proyecto, el nombre por defecto de la subcarpeta en donde se encuentran los `*.c` y `*.h` es `src/`

## Contacto

Si encontrás algun error en los makefiles o tenés alguna sugerencia, no dudes en levantar un issue en este repositorio!

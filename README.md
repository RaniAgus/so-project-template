# so-project-template
Template para facilitar la creación de proyectos en C con una biblioteca 
compartida.

![image](https://user-images.githubusercontent.com/39303639/148606688-2dac8b15-d90f-4e01-aef4-3a25a309c927.png)

## Features

Ambos makefiles:

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

## Uso

### 1. ¿Cómo creo mis proyectos?

- Para crear un proyecto estándar podés descargar la carpeta `project/` desde 
las [releases](https://github.com/RaniAgus/so-project-template/releases):

```
bash <(wget -qO- https://github.com/RaniAgus/so-project-template/releases/latest/download/init.sh) project
```

- Para crear una static library se deberá hacer el mismo procedimiento, en este
caso mediante la carpeta `static/`:

```
bash <(wget -qO- https://github.com/RaniAgus/so-project-template/releases/latest/download/init.sh) static
```

- Para crear una shared library se deberá hacer el mismo procedimiento, en este
caso mediante la carpeta `shared/`:
```
bash <(wget -qO- https://github.com/RaniAgus/so-project-template/releases/latest/download/init.sh) shared
```

### 2. ¿Dónde dejo mi código?

Los proyectos funcionan bajo la siguiente estructura, adaptada para que
[so-deploy](https://github.com/sisoputnfrba/so-deploy) funcione:

```makefile
.
└─── {ProjectName}
      └─── bin
      |     └─── {ProjectName}[.out|.so|.a]   # Archivo binario final 
      └─── include
      |     └─── *.h                          # Headers
      └─── obj
      |     └─── *.o / *.d                    # Archivos generados al compilar
      └─── src
      |     └─── *.c                          # Código
      └─── makefile                           # Makefile
      └─── settings.mk                        # Configuración del makefile
```

### 3. ¿Cómo configuro el proyecto?

Podés configurar cada proyecto editando las variables que se encuentran en el 
archivo `settings.mk` del mismo.

#### Cambiar el nombre del proyecto

Por defecto, el makefile toma el nombre de la carpeta raíz como nombre del 
proyecto. Para cambiar esto, se puede editar la variable `NAME`:

```makefile
# Project name
NAME=$(shell cd . && pwd | xargs basename)
```

#### Agregar una biblioteca

Para incluir una biblioteca alcanza con editar la macro `LIBS` del makefile. 
Si esta biblioteca no se encuentra instalada, para incluirla también se debe 
editar la variable `XXXXXX_LIBS_PATHS`. 

Por ejemplo, para incluir las `commons`, `pthread`, una biblioteca estática 
llamada `utils` y una biblioteca compartida llamada `hilolay`, (las dos últimas
ubicadas en el mismo repo) se deberá agregar lo siguiente:

```makefile
# Libraries
LIBS=hilolay utils commons pthread

# Custom libraries' paths
SHARED_LIBPATHS=../hilolay
STATIC_LIBPATHS=../utils
```

Algo que nos puede ocurrir es que algunas bibliotecas dependan de otras. 
De ser así, es importante que ordenemos las bibliotecas en `LIBS` de izquierda a
derecha (o sea, si `hilolay` depende de `utils` y ésta depende de 
`commons` y `pthread`, el orden correcto es el que figura arriba de este 
párrafo).

#### Incluir una biblioteca desde el código

Luego, para incluirla desde el código, los `#include`s se pueden poner entre 
`<>` como path relativo a `{LIB_PATH}/include/`, por ejemplo, si 
`STATIC_LIBS_PATHS` incluye `../utils`, el siguiente `#include`: 

```c
#include <utils/hello.h>
```

Termina siendo equivalente a:

```c
#include "../utils/include/utils/hello.h"
```

Ya que la ruta es de la forma `{LIB_PATH}/include/utils/hello.h`. 

La ventaja de usar `<>` es que si la ruta relativa cambia no hace falta hacer 
cambios en el código, simplemente alcanza con modificar el archivo 
`settings.mk`.

#### Configurar `gcc`

Se puede cambiar los flags que se le pasen a `gcc` editando dos variables que
pertenecen a configuraciones distintas (una de debug y otra de release):

```makefile
# Compiler flags
CDEBUG=-Wall -DDEBUG -g
CRELEASE=-O3 -Wall -DNDEBUG
```

De esta forma, si querés agregarle optimizaciones o definir macros de 
preprocesador, este es el lugar para hacerlo. Para más info sobre los flags de 
`gcc` te aconsejo ver
[esta página](https://www.rapidtables.com/code/linux/gcc.html). También podés
revisar la
[docu oficial](https://gcc.gnu.org/onlinedocs/gcc-9.1.0/gcc/Invoking-GCC.html#Invoking-GCC).

### 4. ¿Cómo lo importo en el IDE?

- [Cómo importar en Eclipse](../../wiki/Eclipse)
- Cómo importar en Visual Studio Code (WIP)

### 5. ¿Qué comandos uso para compilar?

#### `make` / `make debug`

Compila el proyecto con flags para debugear.

- Si algún archivo fuente que se encuentre en `./src`, `./include` o en las
bibliotecas de las que depende fue modificado, vuelve a compilar:
```bash
$ make
gcc -Wall -DDEBUG -g -c -o "obj/main.o" src/main.c -I./include
gcc -Wall -DDEBUG -g -o "bin/project.out" obj/main.o -I./include  
```

- Si ninguno de esos archivos fue modificado y ya existe un ejecutable, 
aparecerá el mensaje:
```
$ make debug
make: Nothing to be done for 'debug'.
```

#### `make clean`

Elimina los archivos generados al compilar:
```bash
$ make clean
rm -rfv obj/main.o bin/project.out
removed 'obj/main.o'
removed 'bin/project.out'
```

Con esta regla podemos, por ejemplo, forzar una compilación completa utilizando 
`clean debug`:
```bash
$ make clean debug
rm -rfv obj/main.o bin/project.out
removed 'obj/main.o'
removed 'bin/project.out'
gcc -Wall -DDEBUG -g -c -o "obj/main.o" src/main.c -I./include
gcc -Wall -DDEBUG -g -o "bin/project.out" obj/main.o -I./include  
```

#### `make watch`

Esta regla utiliza la herramienta [entr](http://eradman.com/entrproject/), que 
se deberá tener instalada antes de usar esta regla:
```bash
$ sudo apt install entr
```

Sirve para observar cambios en los archivos del proyecto y ejecutar `make debug`
cada vez que esto suceda:
```bash
$ make watch
while sleep 0.1; do \
        find src/ include/ | entr -d make debug --no-print-directory; \
done
# Primero, compila con un error...
gcc -Wall -DDEBUG -g -c -o "obj/main.o" src/main.c -I./include
src/main.c: In function ‘main’:
src/main.c:5:26: error: expected ‘;’ before ‘return’
    5 |     puts("Hello world!!")
      |                          ^
      |                          ;
    6 |     return 0;
      |     ~~~~~~                
make[1]: *** [makefile:34: obj/main.o] Error 1
# Luego, corrijo el error y al guardar...
gcc -Wall -DDEBUG -g -c -o "obj/main.o" src/main.c -I./include
gcc -Wall -DDEBUG -g -o "bin/project.out" obj/main.o -I./include 
# Y sigue escuchando...
```

Se puede cortar la ejecución con `Ctrl`+`C`.

### 6. ¿Cómo uso Valgrind?

Para ejecutar Valgrind utilizamos las reglas `start`, `memcheck` o `helgrind`.
Se pueden agregar flags extra para los dos últimos editando sus respectivas
variables en el archivo `settings.mk`:

```makefile
# Valgrind flags
MEMCHECK_FLAGS=--track-origins=yes --log-file="memcheck-$(NAME).log"
HELGRIND_FLAGS=--log-file="helgrind-$(NAME).log"
```

¡También se pueden pasar parámetros al `main()`! Para esto, le asignamos un 
valor a la variable `ARGS` de la siguiente forma:
```
$ make start ARGS="arg1 arg2 arg3"
valgrind --tool=none ./bin/project.out arg1 arg2 arg3
```
O editando la variable en el archivo `settings.mk`:

```makefile
# Arguments when executing with start, memcheck or helgrind
ARGS=arg1 arg2 arg3
```

#### `make start`

Útil para su uso al debugear el TP sin ninguna herramienta extra, ya que 
Valgrind permite imprimir stack traces custom utilizando la función de Valgrind
`VALGRIND_PRINTF_BACKTRACE(...)`. Para más info recomiendo ver 
[este artículo](https://blog.mozilla.org/nnethercote/2011/01/11/using-valgrind-to-get-stack-traces/).

```
$ make start
valgrind --tool=none ./bin/project.out arg1 arg2 arg3
==12843== Nulgrind, the minimal Valgrind tool
==12843== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote.
==12843== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==12843== Command: ./bin/project.out arg1 arg2 arg3
==12843== 
Hello world!!
==12843== 
```

#### `make daemon`

Es una mezcla de `watch` y `start`, ya que permite observar cambios en los 
archivos del proyecto y, en este caso, ejecutar `make start`:

```bash
make daemon
while sleep 0.1; do \
        find src/ include/ | entr -d make start --no-print-directory; \
done
valgrind --tool=none ./bin/project.out 
==14557== Nulgrind, the minimal Valgrind tool
==14557== Copyright (C) 2002-2017, and GNU GPL-d, by Nicholas Nethercote.
==14557== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==14557== Command: ./bin/project.out
==14557== 
Hello world!!
==14557== 
# Cambio "Hello world!!" por "Hola mundo!!"
gcc -Wall -DDEBUG -g -c -o "obj/main.o" src/main.c -I./include
gcc -Wall -DDEBUG -g -o "bin/project.out" obj/main.o -I./include  
valgrind --tool=none ./bin/project.out 
==14652== Nulgrind, the minimal Valgrind tool
==14652== Copyright (C) 2002-2017, and GNU GPL-d, by Nicholas Nethercote.
==14652== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==14652== Command: ./bin/project.out
==14652== 
Hola mundo!!
==14652== 
```

Se puede reiniciar con `q` o finalizar con `Ctrl`+`C`.

#### `make memcheck`

Útil para verificar errores de manejo de memoria: uso de variables sin 
inicializar, memory leaks, etc. Para más info, ver 
[esta guía](https://faq.utnso.com.ar/valgrind).

```
$ make memcheck
valgrind --leak-check=full --track-origins=yes ./bin/project.out 
==13429== Memcheck, a memory error detector
==13429== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==13429== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==13429== Command: ./bin/project.out
==13429== 
Hello world!!
==13429== 
==13429== HEAP SUMMARY:
==13429==     in use at exit: 0 bytes in 0 blocks
==13429==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==13429== 
==13429== All heap blocks were freed -- no leaks are possible
==13429== 
==13429== For lists of detected and suppressed errors, rerun with: -s
==13429== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

#### `make helgrind`

Útil para diagnosticar problemas de sincronización, como por ejemplo posibles
condiciones de carrera. Para más info, ver: https://youtu.be/knRei6OBU4Q?t=536

```
$ make helgrind
==13540== Helgrind, a thread error detector
==13540== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.
==13540== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==13540== Command: ./bin/project.out
==13540== 
Hello world!!
==13540== 
==13540== Use --history-level=approx or =none to gain increased speed, at
==13540== the cost of reduced accuracy of conflicting-access information
==13540== For lists of detected and suppressed errors, rerun with: -s
==13540== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

### 7. ¿Cómo despliego el proyecto?

Utilizando las reglas `make release` y `make install`, podemos desplegar el 
repo con un solo comando usando el script de deploy que se encuentra en
[so-deploy](https://github.com/sisoputnfrba/so-deploy). 

#### `make release`

Compila el proyecto con flags de release. Al igual que `make debug`, solamente
recompila cuando es necesario:

```bash
$ make release
gcc -O3 -Wall -DNDEBUG -c -o "obj/main.o" src/main.c -I./include
gcc -O3 -Wall -DNDEBUG -o "bin/project.out" obj/main.o -I./include  
```

Para usar esta regla, debemos pasarle el flag `-m=release` al script.

#### `make install`

Para instalar una biblioteca compartida, se pueden usar las comandos 
`make install` y `make uninstall` respectivamente.

Ambos copian la biblioteca (`*.so`) y los headers (`*.h`) a las carpetas que
indiquen las variables ` ` y ` `:

```makefile
# Path where the library will be installed
INST_LIB=/usr/local/lib
INST_H=/usr/local/include
```

### ¿Cómo hago para acordarme de todos estos comandos?

¡No hace falta! Podés usar la regla `help` para ver todos los comandos 
disponibles:

```
$ make help
COMPILATION COMMANDS:
    make / make debug -- Build project using debug flags.
    make release      -- Build project using release flags.
    make clean        -- Remove generated files from file system.
    make watch        -- Run 'make debug' when any file is modified.
PROFILING COMMANDS:
    make start        -- Run using valgrind without any extra tool.
    make daemon       -- Run 'make start' when any file is modified.
    make memcheck     -- Run using valgrind memcheck tool.
    make helgrind     -- Run using valgrind helgrind tool.
INSTALLATION COMMANDS:
    make install      -- Install the shared library and its headers.
    make uninstall    -- Remove the shared object and its headers.
```

## Contacto

Si encontrás algun error en los makefiles o tenés alguna sugerencia, ¡no dudes 
en abrir un issue en este repositorio!


# so-project-template
Template para facilitar la creación de proyectos en C con una biblioteca 
compartida.

## Features

Ambos makefiles:

✔️ Compilan solamente los archivos fuente necesarios, incluso detecta cuándo las
bibliotecas hechas por el usuario fueron modificadas para volver a compilar
todos los objetos.

✔️ Permiten el uso de subcarpetas.

✔️ Se pueden importar desde Eclipse, CLion, VSCode o cualquier editor de texto u
 entorno de desarrollo.

✔️ Permiten que el repo se pueda deployar usando el script 
[so-deploy](https://github.com/sisoputnfrba/so-deploy).

✔️ No requieren que se especifique el nombre del proyecto al que pertenecen 
(alcanza con copiar la carpeta `./project` o `./static` y modificar su nombre para 
configurar el nombre del proyecto).

✔️ Incluyen flags de debug para `make all` y flags de release para `make release`.

✔️ Poder observar cambios en los archivos y recompilar
automáticamente mediante `make watch`.

✔️ ¡No hace falta configurar variables de entorno! La biblioteca compartida es una
static library, que luego es compilada directamente en el binario final del
proyecto. Para saber más info sobre static vs shared libraries, podés
[ver este video](https://www.youtube.com/watch?v=JbHmin2Wtmc).

✔️ En caso de que tu TP también requiera utilizar la interfaz de una shared library,
podés utilizar el proyecto que se enucuentra en `./shared`. Incluye reglas para
instalarla y desinstalarla: `make install` y `make uninstall`.

Además, el makefile del proyecto incluye:

✔️ Ejecución con Valgrind mediante `make start`, `make memcheck` y `make helgrind`.

## Uso

### Cómo estructurar cada proyecto

Los proyectos funcionan bajo la siguiente estructura, adaptada para que
[so-deploy](https://github.com/sisoputnfrba/so-deploy) funcione:

```makefile
.
└─── {ProjectName}
      └─── bin
      |     └─── {ProjectName}.out    # Archivo binario final 
      └─── include
      |     └─── *.h                  # Headers
      └─── obj
      |     └─── *.o / *.d            # Archivos generados al compilar
      └─── src
      |     └─── *.c                  # Código
      └─── makefile
```

Sin embargo, podés ajustarla a tus preferencias modificando las siguientes
variables:

```makefile
# Project structure
ENTRYPOINT=src/main.c
SRCDIR=src/
IDIR=include/
OBJDIR=obj/
BINDIR=bin/
```

La única restricción a la hora de estructurar el proyecto es que todas las 
variables excepto `BINDIR` deben ser no vacías y ninguna puede ser `.` o `./`.

### ¿Cómo creo mis proyectos?

- Para crear un proyecto estándar podés descargar la carpeta `project/` desde las 
[releases](https://github.com/RaniAgus/so-project-template/releases):

```
bash <(wget -qO- https://github.com/RaniAgus/so-project-template/releases/latest/download/init.sh) project
```

Luego, deberás [incluir las bibliotecas](#cómo-incluyo-una-biblioteca) que utilices.

- Para crear una static library se deberá hacer el mismo procedimiento, en este
caso mediante la carpeta `static/`:

```
bash <(wget -qO- https://github.com/RaniAgus/so-project-template/releases/latest/download/init.sh) static
```
Luego, deberás [incluir esa library](#cómo-incluyo-una-biblioteca) en los proyectos 
que la utilicen.

- Para crear una shared library se deberá hacer el mismo procedimiento, en este
caso mediante la carpeta `shared/`:
```
bash <(wget -qO- https://github.com/RaniAgus/so-project-template/releases/latest/download/init.sh) shared
```
Luego, deberás [incluir esa library](#cómo-incluyo-una-biblioteca) en los proyectos 
que la utilicen.

### ¿Cómo incluyo una biblioteca?

#### 1. Incluir en el makefile

Para incluir una biblioteca alcanza con editar la macro `LIBRARIES` del makefile. 
También, para incluir una biblioteca propia se debe editar tanto `LIBRARIES` como 
`LIBRARY_PATHS`. 

Por ejemplo, para incluir las `commons` y una biblioteca propia llamada `utils`
ubicada en el mismo repo se deberá agregar lo siguiente:

```makefile
# Include libraries here
LIBRARIES=utils commons pthread

# Include custom library paths here
SHARED_LIBRARY_PATHS=
STATIC_LIBRARY_PATHS=../utils
```

#### 2. Incluir en el código

Los includes se pueden poner entre `<>` como path relativo a 
`{LIBRARY_PATH}/{IDIR}`.

Por ejemplo, para incluir las funciones de `utils` podemos hacer:

```c
#include <utils/hello.h>
```

Ya que `LIBRARY_PATH` es `../utils` e `IDIR` es `src/`, entonces 
`{LIBRARY_PATH}/{IDIR}utils/hello.h` nos da por resultado lo mismo que:

```c
#include "../utils/src/utils/hello.h"
```

### ¿Cómo importo los proyectos en el IDE?

- [Cómo importar en Eclipse](../../wiki/Eclipse)

### Comandos básicos

#### All
Compila el proyecto con flags de Debug (cualquiera de los dos es válido):
```
$ make
$ make all
```

#### Clean
Elimina los archivos generados al compilar:
```
$ make clean
```
Nos permite, por ejemplo, realizar una compilación limpia utilizando `clean all`:
```
$ make clean all
```

#### Watch
Esta regla utiliza la herramienta [entr](http://eradman.com/entrproject/), que 
debemos instalar de la siguiente forma:
```
$ sudo apt install entr
```

Sirve para observar cambios en los archivos del proyecto y ejecutar `make all`
cada vez que esto suceda:
```
$ make watch
```

### Comandos de Valgrind

Para ejecutar Valgrind utilizamos las reglas `start`, `memcheck` o `helgrind`.

¡También se pueden pasar parámetros al `main()`! Para esto, le asignamos un 
valor a la variable `ARGS` de la siguiente forma:
```
$ make start ARGS="arg1 arg2 arg3"
```

#### Start

Útil para su uso al debugear el TP sin ninguna herramienta extra, ya que 
Valgrind permite imprimir stack traces custom utilizando la función de Valgrind
`VALGRIND_PRINTF_BACKTRACE(...)`. Para más info recomiendo ver 
[este artículo](https://blog.mozilla.org/nnethercote/2011/01/11/using-valgrind-to-get-stack-traces/).

```
$ make start
```

#### Memcheck

Útil para verificar errores de manejo de memoria: uso de variables sin 
inicializar, memory leaks, etc. Para más info, ver 
[esta guía](https://faq.utnso.com.ar/valgrind).

```
$ make memcheck
```

Los resultados se imprimen en un log file con el formato 
`memcheck_<proyecto>.log`.

#### Helgrind

Útil para diagnosticar problemas de sincronización, como por ejemplo posibles
condiciones de carrera. Para más info, ver: https://youtu.be/knRei6OBU4Q?t=536

```
$ make helgrind
```

Los resultados se imprimen en un log file con el formato 
`helgrind_<proyecto>.log`.

### ¿Cómo hago para acordarme de todos estos comandos?

¡No hace falta! Podés usar la regla `help`:

```
$ make help

COMMANDS:
    make / make all -- Build project using debug flags.
    make release    -- Build project using release flags.
    make clean      -- Remove generated files from file system.
    make watch      -- Run make when files change.
    make start      -- Run using valgrind without any extra tool.
    make memcheck   -- Run using valgrind memcheck tool. Output will be redirected to an external log file.
    make helgrind   -- Run using valgrind helgrind tool. Output will be redirected to an external log file.
VARIABLES:
    ARGS          -- Arguments to be passed to main() using valgrind tools (eg: 'make helgrind ARGS="arg1 arg2 arg3"').
    LIBRARIES     -- External libraries to be included and linked, separated by spaces (eg: 'utils pthread commons').
    LIBRARY_PATHS -- Relative path to own static libraries root, separated by spaces (eg: '../utils').
    PROJECT       -- Your project name. By default it will be your pwd basename.
```

## Consejos extra

### Uso de un .gitignore

Aconsejo agregar al archivo .gitignore del repo del proyecto las siguientes
reglas para evitar pushear archivos que no son necesarios para que funcione el
TP:

```makefile
# Eclipse files
**/RemoteSystemsTempFiles/
**/Debug/
**/Release/
**/.settings/
**/.cproject
**/.project

# CLion files
**/.idea/

# Visual Studio Code files
**/.vscode/
*.code-workspace

# Other
**/bin/
**/obj/
*.log
```

## Contacto

Si encontrás algun error en los makefiles o tenés alguna sugerencia, ¡no dudes 
en levantar un issue en este repositorio!


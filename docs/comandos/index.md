# Comandos

## `make all`

- Tipo: compilación

- Descripción: Compilar el proyecto con flags para desarrollar.

Es el comando que se invoca por defecto al ejecutar `make`.

- Configuración:
  - `LIBS`
  - `STATIC_LIBPATHS`
  - `SHARED_LIBPATHS`
  - `CDEBUG`


- Ejemplos:

Si algún archivo fuente que se encuentre en `./src`, `./include` o en las
bibliotecas de las que depende fue modificado, vuelve a compilar:

```
gcc -Wall -DDEBUG -g -c -o "obj/main.o" src/main.c -I./include
gcc -Wall -DDEBUG -g -o "bin/project.out" obj/main.o -I./include
```

Si ninguno de esos archivos fue modificado y ya existe un ejecutable,
aparecerá el mensaje:
```
make: Nothing to be done for 'all'.
```

## `make clean`

- Tipo: compilación

- Descripción: Eliminar los archivos generados al compilar

- Configuración: -

- Ejemplo:

```
rm -rf obj bin
```

## `make watch`

- Tipo: compilación
- Descripción: Ejecutar `make all` cada vez que se guarde un cambio en el
proyecto.

- Dependencias: [entr](http://eradman.com/entrproject/)

- Configuración:
  - `LIBS`
  - `STATIC_LIBPATHS`
  - `SHARED_LIBPATHS`
  - `CDEBUG`

- Ejemplo:

Primero, compila con error...

```
gcc -Wall -DDEBUG -g -c -o "obj/main.o" src/main.c -I./include
src/main.c: In function ‘main’:
src/main.c:5:26: error: expected ‘;’ before ‘return’
    5 |     puts("Hello world!!")
      |                          ^
      |                          ;
    6 |     return 0;
      |     ~~~~~~
make[1]: *** [makefile:34: obj/main.o] Error 1
```

... y se queda escuchando cambios.

Luego, corrijo el error y al guardar ejecuta...

```
gcc -Wall -DDEBUG -g -c -o "obj/main.o" src/main.c -I./include
gcc -Wall -DDEBUG -g -o "bin/project.out" obj/main.o -I./include
```

... y sigue escuchando nuevos cambios.

## `make start`

- Tipo: ejecución

- Descripción: Ejecutar con `valgrind --tool=none`

- Configuración:
  - `SHARED_LIBPATHS`
  - `ARGS`

- Ejemplo:

```
==12843== Nulgrind, the minimal Valgrind tool
==12843== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote.
==12843== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==12843== Command: ./bin/project.out arg1 arg2 arg3
==12843==
**12843** Hola Mundo: 42
==12843==    at 0x10938B: VALGRIND_PRINTF_BACKTRACE (valgrind.h:6808)
==12843==    by 0x1093F3: funcion (main.c:4)
==12843==    by 0x109412: main (main.c:8)
==12843==
```

## `make memcheck`

- Tipo: ejecución
- Descripción: Ejecutar con `valgrind --leak-check=full`

Útil para verificar errores de manejo de memoria: uso de variables sin
inicializar, memory leaks, etc.

- Configuración:
  - `SHARED_LIBPATHS`
  - `MEMCHECK_FLAGS`
  - `ARGS`

- Ejemplo:

```
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

::: tip

Para más info, ver
[esta guía](https://docs.utnso.com.ar/guias/herramientas/valgrind)

:::

## `make helgrind`

- Tipo: ejecución
- Descripción: Ejecutar con `valgrind --tool=helgrind`

Útil para diagnosticar problemas de sincronización, como por ejemplo posibles
condiciones de carrera.

- Configuración:
  - `SHARED_LIBPATHS`
  - `HELGRIND_FLAGS`
  - `ARGS`

- Ejemplo:

```
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

## `make daemon`

- Tipo: ejecución

- Descripción: Ejecutar `make all` cada vez que se guarde un cambio en el
proyecto.

- Dependencias: [entr](http://eradman.com/entrproject/)

- Configuración:
  - `LIBS`
  - `STATIC_LIBPATHS`
  - `SHARED_LIBPATHS`
  - `CDEBUG`
  - `ARGS`

- Ejemplo:

Primero, compila un "Hello world!!!"...

```
==14557== Nulgrind, the minimal Valgrind tool
==14557== Copyright (C) 2002-2017, and GNU GPL-d, by Nicholas Nethercote.
==14557== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==14557== Command: ./bin/project.out
==14557==
Hello world!!
==14557==
```
... y se queda escuchando cambios.

Cambio "Hello world!!" por "Hola mundo!!", y al guardar se ejecuta...

```
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

## `make release`

- Tipo: compilación
- Descripción: Compilar el proyecto con optimizaciones para la entrega final.

- Configuración:
  - `LIBS`
  - `STATIC_LIBPATHS`
  - `SHARED_LIBPATHS`
  - `CRELEASE`

- Ejemplo:

```
gcc -O3 -Wall -DNDEBUG -c -o "obj/main.o" src/main.c -I./include
gcc -O3 -Wall -DNDEBUG -o "bin/project.out" obj/main.o -I./include
```

Para usar esta regla, debemos pasarle el flag `-m=release` al script.

## `make install`

- Tipo: instalación

- Descripción: Instalar la biblioteca compartida a `/usr/local`.

- Configuración: -

- Ejemplo:
```
sudo cp -uva bin/. /usr/local/lib
'bin/./libshared.so' -> '/usr/local/lib/./libshared.so'
sudo cp -uva include/. /usr/local/include
'include/./shared/hello.h' -> '/usr/local/include/./shared/hello.h'
```

## `make uninstall`

- Tipo: instalación

- Descripción: Eliminar la biblioteca compartida instalada en `/usr/local`.

- Configuración: -

- Ejemplo:
```
sudo rm -fv /usr/local/lib/libshared.so
removed '/usr/local/lib/libshared.so'
sudo rm -fvr /usr/local/include/shared/hello.h
removed '/usr/local/include/shared/hello.h'
```

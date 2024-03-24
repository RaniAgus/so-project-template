# Agregar Unit Testing

Si bien no es obligatorio agregar tests unitarios al código del TP, contar con
ellos nos puede ahorrar un montón de tiempo a la hora de validar que los módulos
cumplan con el comportamiento esperado, sobre todo cuando toca agregar
funcionalidades nuevas sobre código ya probado.

Es por eso que también se incluye, entre los templates, una carpeta en donde
guardar nuestros tests unitarios utilizando el framework
[CSpec](https://docs.utnso.com.ar/guias/herramientas/cspec).

::: warning

Sin embargo, en caso de no contar con experiencia previa desarrollando tests
unitarios, desaconsejamos continuar con esta guía.

:::

## Configuración del template

### Instalar CSpec

Para instalar CSpec, ejecutá en una terminal los siguientes comandos:

```bash
git clone https://github.com/mumuki/cspec.git
cd cspec
make
sudo make install
```
### Excluir archivos fuente

En caso de que estemos testeando un módulo con una función `main()`,
debemos configurar el makefile para que excluya todo el código de este archivo:

```makefile
# Excluded source files (eg: main() function)
TEST_EXCLUDE=src/main.c
```

Ya que, de otra forma, CSpec va a ejecutar nuestro `main()` una vez termine de
correr los unit tests.

::: warning IMPORTANTE

A la hora de excluir archivos fuente del proyecto de tests, es importante
revisar que ninguna función o variable global sea incluida dentro de los demás
archivos.

:::

::: tip

En general es una buena práctica que el archivo fuente que contiene la función
`main()` tenga muy poco código con la lógica más _core_ de la aplicación,
delegando cada tarea a otras funciones de otros archivos fuente que sí son más
acordes para ser testeadas de forma unitaria.

:::

### Agregar unit tests

Por último, para agregar tests a cualquier proyecto (ya sea ejecutable o
biblioteca), debemos hacerlo creando una carpeta `tests` a la misma altura que
`src`:

```bash
mkdir tests
```

Por ejemplo, partiendo del [proyecto base](../), podemos agregar un test inicial:

```bash
touch tests/example_test.c
```

```
.
├── makefile
├── settings.mk
├── src
│   └── main.c
└── tests
    └── example_test.c
```


Con el siguiente código:

::: code-group

```c:line-numbers [example_test.c]
#include <stdio.h>
#include <stdbool.h>
#include <cspecs/cspec.h>

context (example) {
    bool la_verdad = true;

    describe("Hello world") {
        it("la_verdad should be true") {
            should_bool(la_verdad) be equal to(true);
        } end
    } end

}
```
:::

::: tip

Es una buena práctica replicar la estructura de archivos que tenemos en `src/`
para poder identificar bien qué parte del código cubre cada suite:

```
 .
 ├── src
 │   ├── dto
 │   │   ├── handshake.c
 │   │   └── handshake.h
 │   ├── sockets
 │   │   ├── cliente.c
 │   │   ├── cliente.h
 │   │   ├── servidor.c
 │   │   └── servidor.h
 │   └── utils
 │       ├── string.c
 │       └── string.h
 └── tests
     ├── dto
     │   └── handshake_test.c
     ├── sockets
     │   ├── cliente_test.c
     │   └── servidor_test.c
     └── utils
         └── string_test.c
```

:::


## Ejecutar el proyecto

- Desde Eclipse: hacemos click derecho sobre el ejecutable y seleccionamos
`Run As...` > `Local C/C++ Application`.

- Desde Visual Studio Code: debemos agregar la siguiente configuración a nuestro
archivo `launch.json` y luego simplemente elegimos la alternativa `test` entre
las opciones:

::: code-group

```json [launch.json]
{
  // See https://go.microsoft.com/fwlink/?linkid=830387
  // for the documentation about the launch.json format
  "version": "0.2.0",
  "configurations": [
    { // [!code focus]
      "name": "test", // [!code focus]
      "type": "cppdbg", // [!code focus]
      "request": "launch", // [!code focus]
      "program": "${workspaceFolder}/bin/${workspaceFolderBasename}_tests.out", // [!code focus]
      "args": [], // [!code focus]
      "stopAtEntry": false, // [!code focus]
      "cwd": "${workspaceFolder}", // [!code focus]
      "environment": [], // [!code focus]
      "externalConsole": false, // [!code focus]
      "MIMode": "gdb", // [!code focus]
      "setupCommands": [ // [!code focus]
        { // [!code focus]
          "description": "Enable pretty-printing for gdb", // [!code focus]
          "text": "-enable-pretty-printing", // [!code focus]
          "ignoreFailures": true // [!code focus]
        } // [!code focus]
      ], // [!code focus]
      "preLaunchTask": "build" // [!code focus]
    } // [!code focus]
  ]
}
```

:::

## Valgrind

Para utilizar Valgrind, desde la consola podemos ejecutar:
- `make test`: Para correr los tests con Nulgrind.
- `make test-memcheck`: Para correr los tests con Valgrind Memcheck.
- `make test-helgrind`: Para correr los tests con Helgrind.

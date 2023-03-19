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

### Excluir archivos fuente

En caso de que estemos testeando un módulo con una función `main()`,
debemos configurar el makefile para que excluya todo el código de este archivo:

```makefile
# Excluded source files (eg: main() function)
EXCLUDE=main.c
```

Ya que, de otra forma, nos va a parecer el error debido a que CSpec define su
propio `main()` para funcionar:

```
error: redefinition of 'main'
```

::: warning IMPORTANTE

A la hora de excluir archivos fuente del proyecto de tests, es importante
revisar que ninguna función o variable global sea incluida dentro de los demás
archivos.

:::

En general es una buena práctica que el archivo fuente que contiene la función
`main()` sea reducido y solamente contenga la lógica más _core_ de la
aplicación, delegando cada tarea a otras funciones de otros archivos fuente, que
sí van a estar disponibles para ser testeadas.

### Agregar unit tests

Todas las test suites se guardan dentro de la carpeta `tests/`. El template ya
incluye una suite a modo de ejemplo:

```
.
└── tests
    └── example_test.c
```

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

- Desde Visual Studio Code: ya contamos con la configuración necesaria para
ejecutarlo, simplemente elegimos la alternativa `test` entre las opciones.

- Desde Eclipse: hacemos click derecho sobre el ejecutable y seleccionamos
`Run As...` > `Local C/C++ Application`.

## Valgrind

Para utilizar Valgrind, desde la consola podemos ejecutar:
- `make test`: Para correr los tests con Nulgrind.
- `make test-memcheck`: Para correr los tests con Valgrind Memcheck.
- `make test-helgrind`: Para correr los tests con Helgrind.

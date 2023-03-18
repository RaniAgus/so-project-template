# Primeros pasos

## Inicialización

Primero, vamos a descargar el template en una carpeta con el nombre del
proyecto:

```bash
mkdir project && cd project

wget -qO- https://github.com/RaniAgus/so-project-template/releases/download/v3.1.1/project-v3.1.1.tar.gz \
  | tar -xzvf - --strip-components 1
```

## Estructura de carpetas

Se va a descargar la estructura de archivos mínima para crear un "hello world":

```bash
project
├── include
│   └── .gitkeep
├── src
│   └── main.c
├── makefile
└── settings.mk
```

Una breve explicación de los archivos que hay en ella:

| Archivo/Carpeta | Descripción                                                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `./src/`        | Carpeta en donde vamos a dejar todos los archivos fuente (.c) del proyecto                                                                           |
| `./src/main.c`  | Archivo fuente en donde se encuentra la función `main` del proyecto                                                                                  |
| `./include/`    | Acá vamos a dejar todos los headers (.h) del proyecto (más adelante veremos cómo [separar el código en múltiples archivos](./multiples-archivos.md)) |
| `./makefile`    | Makefile utilizado para compilar el proyecto                                                                                                         |
| `./settings.mk` | Configuración extra del proyecto (aprenderemos más a lo largo de la guía)                                                                            |

## Compilación

Podemos compilar el proyecto desde la consola ejecutando:

```bash
make
```

Lo cual creará dos directorios con archivos dentro:

```
project
├── bin
│   └── project.out
└── obj
    └── main.o
```

| Directorio | Descripción                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `./obj/`   | Para cada archivo fuente en `src` se va a generar un objeto en código assembly con fines de acelerar el proceso de compilación. |
| `./bin/`   | El compilador guarda aquí el ejecutable final.                                                                                  |

::: tip

Una vez que se haya generado el ejecutable, si intentamos volver a compilar sin
hacer ningún cambio en el código nos va a aparecer el mensaje:

```
make: Nothing to be done for 'all'.
```

Esto se debe a que el makefile revisa la última fecha de modificación del
binario y la compara con los objetos que dependen de ella:

```bash
$ ls -l bin src

bin:
total 20
-rwxrwxr-x 1 utnso utnso 17256 Mar 12 11:43 project.out

src:
total 4
-rw-rw-r-- 1 utnso utnso   118 Mar 12 11:22 main.c
```

En este caso, se da cuenta que `project.out` fue modificado después que
`main.c`, por lo que no hace falta recompilar.

:::

## Ejecución

Por último, para ejecutar el archivo compilado podemos hacer
`./bin/{name}.out`:

```bash
./bin/project.out
```

El cual nos mostrará el mensaje `Hello world!!`.

::: tip

Si queremos borrar los archivos generados con `make`, podemos ejecutar la regla
`clean`:

```bash
make clean
```

Esta regla nos puede ser útil cuando querramos recompilar todo el código sin
importar si los archivos fuente fueron editados o no; encadenándolo con la regla
`all` (que es la que se ejecuta cuando hacemos solo `make`):

```bash
make clean all
```

:::

## Importar el proyecto en un IDE o Editor de Texto

Antes de continuar con la guía, probablemente quieras importar el proyecto en un
IDE o en un Editor de Texto. En esta página podrás encontrar guías para
importarlo en:

- [Eclipse IDE (recomendado)](./eclipse/project.md)
- [Visual Studio Code](./code/project.md)

## Agregar bibliotecas

Para acceder a funciones de algunas bibliotecas (como las `commons`, `pthread` o
`readline`) hace falta avisarle al
[linker](https://linux.die.net/man/1/ld) que las vincule al momento de compilar.

Por ejemplo, si intentamos compilar este código:

<<< @/snippets/guia/primeros-pasos/commons.c{3}

Nos aparecerá el error:

```bash
undefined reference to 'commons'
```

La solución es agregar la biblioteca a la variable
`LIBS` del archivo `settings.mk`.

```bash
# Libraries
LIBS=commons
```

Lo cual hará que se incluya el flag `-lcommons` al comando `gcc` al momento de
compilar el proyecto.

::: tip ¿Cómo funciona el flag "-l"?

Por defecto, el linker solamente va a buscar bibliotecas en las siguientes tres
rutas:

```
/lib
/usr/lib
/usr/local/lib
```

Se pueden agregar más rutas pasándole a `gcc` el flag `-L{path}` o editando la
variable de entorno `LIBRARY_PATH`.

:::

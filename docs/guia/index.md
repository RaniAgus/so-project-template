<script setup>
import { repository, version } from '../../package.json'
</script>

# Primeros pasos

## Dependencias

Antes de empezar a utilizar los templates, necesitaremos instalar un framework
de Unit Testing llamado [CSpec](https://github.com/mumuki/cspec).

Para instalarlo, ejecutá en una terminal los siguientes comandos:

```bash
git clone https://github.com/mumuki/cspec.git
cd cspec
make
sudo make install
```

## Inicialización

Primero, vamos a descargar el template en una carpeta con el nombre del
proyecto:

```bash-vue
mkdir ejemplo && cd ejemplo

wget -qO- {{ repository }}/releases/download/v{{ version }}/project-v{{ version }}.tar.gz \
  | tar -xzvf - --strip-components 1
```

## Estructura de carpetas

Se va a descargar la estructura de archivos mínima para crear un "hello world":

```bash
tree .
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

Una breve explicación de los archivos que hay en ella:

| Archivo/Carpeta          | Descripción                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `./makefile`             | Makefile utilizado para compilar el proyecto                                        |
| `./settings.mk`          | Configuración extra del proyecto (aprenderemos más a lo largo de la guía)           |
| `./src/`                 | Carpeta en donde vamos a dejar todos los archivos fuente (.c y .h) del proyecto     |
| `./src/main.c`           | Archivo fuente en donde se encuentra la función `main` del proyecto                 |
| `./tests/`               | Acá vamos a dejar todos unit tests del proyecto (más adelante veremos cómo hacerlo) |
| `./tests/example_test.c` | Un unit test a modo de ejemplo, podemos ignorarlo por ahora                         |

## Compilación

Podemos compilar el proyecto desde la consola ejecutando:

```bash
make
```

Lo cual creará dos directorios con archivos dentro:

```bash
tree bin obj
```

```
.
├── bin
│   ├── {nombre-del-proyecto}.out
│   └── {nombre-del-proyecto}_tests.out
└── obj
    └── main.o
```

| Directorio | Descripción                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `./obj/`   | Para cada archivo fuente en `src` se va a generar un objeto en código assembly con fines de acelerar el proceso de compilación. |
| `./bin/`   | El compilador guarda aquí el ejecutable final y el ejecutable de los unit tests.                                                |

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
-rwxrwxr-x 1 utnso utnso 17256 Mar 12 11:43 ejemplo.out
-rwxrwxr-x 1 utnso utnso 17256 Mar 12 11:43 ejemplo_tests.out

src:
total 4
-rw-rw-r-- 1 utnso utnso   118 Mar 12 11:22 main.c
```

En este caso, se da cuenta que `ejemplo.out` fue modificado después que
`main.c`, por lo que no hace falta recompilar.

:::

## Ejecución

Por último, para ejecutar el archivo compilado podemos ingresar
`./bin/{nombre-del-proyecto}.out`:

```bash
./bin/ejemplo.out
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

## Próximos pasos

Ya logramos inicializar el proyecto desde la consola, pero para empezar a
desarrollar vamos a necesitar un IDE o editor de texto. En la próxima sección
veremos las alternativas más recomendables.

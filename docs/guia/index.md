<script setup>
import { repository, version } from '../../package.json'
</script>

# Primeros pasos

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
└── src
    └── main.c
```

Una breve explicación de los archivos que hay en ella:

| Archivo/Carpeta          | Descripción                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `./makefile`             | Makefile[^1] utilizado para compilar el proyecto                                    |
| `./settings.mk`          | Configuración extra del proyecto (aprenderemos más a lo largo de la guía)           |
| `./src/`                 | Carpeta en donde vamos a dejar todos los archivos fuente (.c y .h) del proyecto     |
| `./src/main.c`           | Archivo fuente en donde se encuentra la función `main` del proyecto                 |

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
│   └── {nombre-del-proyecto}
└── obj
    └── main.o
```

| Directorio | Descripción                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `./obj/`   | Para cada archivo fuente en `src` se va a generar un objeto en código assembly con fines de acelerar el proceso de compilación. |
| `./bin/`   | El compilador guarda aquí el ejecutable final y el ejecutable de los unit tests (en caso de haber).                             |

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
-rwxrwxr-x 1 utnso utnso 17256 Mar 12 11:43 ejemplo

src:
total 4
-rw-rw-r-- 1 utnso utnso   118 Mar 12 11:22 main.c
```

En este caso, se da cuenta que `ejemplo` fue modificado después que
`main.c`, por lo que no hace falta recompilar.

:::

## Ejecución

Por último, para ejecutar el archivo compilado podemos ingresar
`./bin/{nombre-del-proyecto}`:

```bash
./bin/ejemplo
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

<br><br>

[^1]: La explicación sobre qué es un Makefile y cómo construir uno se
encuentra fuera del alcance de la guía. Si te interesa, podés arrancar viendo
[este video](https://www.youtube.com/watch?v=a8mPKBxQ9No&list=PL9IEJIKnBJjEPxenuhKU7J5smY4XjFnyg&index=1)
o leyendo [este otro tutorial](https://makefiletutorial.com/).

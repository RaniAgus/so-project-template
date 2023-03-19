<script setup>
import { repository, version } from '../../package.json'
</script>

# Shared Libraries

::: warning NOTA

En caso de el TP de este cuatrimestre no requiera la implementación de una
shared library y que lo único que quieras es compartir código entre proyectos,
[esta es la guía que estás buscando](./static-libraries.md).

:::

_Algunos_ TPs requieren del desarrollo de una biblioteca compartida en base
a una interfaz bien definida (como, por ejemplo,
[CarpinchOS](https://github.com/sisoputnfrba/matelib), del 2c-2021).

Este tipo de bibliotecas tienen la particularidad de que su código no se compila
en el archivo binario final, sino que el mismo se carga en memoria
al momento de **ejecutar** el binario.

Esto las diferencia de las [static libraries](static-libraries.md) que vimos
anteriormente, ya que éstas **sí** incluyen el código directamente en el binario
al momento de **compilar**.

## ¿Por qué una shared library?

Ambos tipos de bibliotecas tienen sus ventajas y desventajas (que se pueden ver
más en detalle en [este video](https://www.youtube.com/watch?v=JbHmin2Wtmc)),
pero a fines del TP la razón por la cual se puede requerir desarrollar una
shared library es poder compilar los
[archivos de prueba](https://github.com/sisoputnfrba/carpinchos-pruebas) que
consumen esta biblioteca sin necesidad de que exista implementación alguna, ya
que `gcc` no incluye su código en el binario, sino que solo revisa que se cumpla
con la interfaz definida en los headers de la shared library.

Es por esto que los alumnos deben implementar la shared library **sin modificar
los headers**, e instalarla para que al momento de ejecutar la prueba (que es
cuando se vincula el código de la prueba con el de la implementación) no
aparezca el error:

```
error while loading shared libraries: lib*****.so: cannot open shared object file: No such file or directory
```

¡Comencemos!

## Crear un proyecto tipo shared library

### Inicialización

Una vez más, descargaremos otro template en una carpeta con el nombre de nuestra
biblioteca compartida:

```bash-vue
mkdir shared && cd shared

wget -qO- {{ repository }}/releases/download/v{{ version }}/shared-v{{ version }}.tar.gz \
  | tar -xzvf - --strip-components 1
```

### Estructura de carpetas

La idea es que en el repo de nuestro TP nos quede una estructura parecida a
esta:

```bash
repo
├── project # El proyecto no sería un módulo del TP, sino un test provisto por la cátedra
│   ├── include
│   ├── src
│   │   └── main.c
│   ├── makefile
│   └── settings.mk
└─── shared
    ├── include
    │   └── utils
    │       └── hello.h
    ├── src
    │   └── utils
    │       └── hello.c
    ├── makefile
    └── settings.mk
```

### Compilación

Para compilarla también ejecutaremos:

```bash
make
```

Aunque en este caso se generará un archivo de nombre `lib{nombre}.so` en
la subcarpeta `bin`:

```
shared
├── bin
│   └── libshared.so
└── obj
    └── utils
        └── hello.o
```

## Agregar una shared library en un proyecto existente

::: warning Antes de continuar...

Es posible que quieras importar el proyecto en tu IDE o Editor de Texto:

- [Guía para Eclipse](./eclipse/static.md)
- [Guía para Visual Studio Code](./code/static.md)

No te preocupes por salir, al final de cada guía hay un link para volver acá
:smile:.

:::

Este archivo deberá ser incluido en nuestro proyecto al momento de compilarlo
similar a como vimos en la
[sección de static libraries](./static-libraries.md#agregar-una-static-library-en-un-proyecto-existente),
exepto que en este caso la variable a editar es `SHARED_LIBPATHS`:


```bash
# Libraries
LIBS=shared commons
# Custom libraries' paths
SHARED_LIBPATHS=../shared
```

Esta variable, además de configurar `-I` y `-L` de la misma forma que la
variable `STATIC_LIBPATHS`, configura un flag que el linker utiliza para ir a
buscar la biblioteca al momento de ejecutar: `-rpath`.

::: tip

[Al igual que con las static libraries](./static-libraries.md#compilar-el-proyecto),
podés ejecutar directamente `make` en el proyecto cada vez que hagas un cambio
en la shared library, ya que el makefile se va a encargar de recompilar la
biblioteca (y luego, todos los archivos del proyecto) para evitar
inconsistencias.

:::

## Instalar una shared library

Hasta ahora, la configuración con la que contamos nos ahorra un montón de
dolores de cabeza al ejecutar los proyectos en un ambiente de desarrollo. Sin
embargo, cuando llegue el momento de la entrega necesitaremos instalar la
biblioteca en la VM.

Para esto, utilizaremos el comando:
```bash
make install
```

El cual se encarga de copiar:
- Los headers que se encuentran en `./include` a `/usr/local/include` (una de
las rutas en donde `gcc` va a buscar la interfaz de la biblioteca a la hora de
compilar).

- El archivo `lib{name}.so` generado en `./bin` a `/usr/local/bin` (una de las
rutas en donde `ld` va a buscar bibliotecas, en este caso, al momento de
ejecutar).

::: tip DATO

Las commons se instalan de la misma forma.

:::

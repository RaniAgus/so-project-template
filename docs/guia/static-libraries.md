<script setup>
import { repository, version } from '../../package.json'
</script>

# Código común entre proyectos

Cuando empecemos a desarrollar cada módulo, notaremos que hay algunas funciones
que se repiten entre sí. El ejemplo más común son las definiciones del protocolo
de comunicación (como iniciar un servidor, conectarse como cliente, serializar y
deserializar mensajes, etc).

Si queremos reutilizar este código en los distintos proyectos del TP, podemos
crear una
[static library](https://www.geeksforgeeks.org/static-vs-dynamic-libraries/) e
incluirla dentro del ejecutable final de nuestro proyecto al momento de
**compilar**.

## Crear un proyecto tipo static library

### Inicialización

Al igual que con un proyecto común, vamos a comenzar descargando un
template en una carpeta con el nombre de nuestra static library de esta forma:

```bash-vue
mkdir utils && cd utils

wget -qO- {{ repository }}/releases/download/v{{ version }}/static-v{{ version }}.tar.gz \
  | tar -xzvf - --strip-components 1
```

### Estructura de archivos

La idea es que en el repo de nuestro TP nos quede una estructura parecida a
esta:

```
tp-2023-1c-Ayudantes
├── ejemplo
│   ├── src
│   │   └── main.c
│   ├── makefile
│   └── settings.mk
└── utils
    ├── src
    │   └── utils
    │       ├── hello.c
    │       └── hello.h
    ├── makefile
    └── settings.mk
```

### Compilación

Para compilarla, también ejecutaremos:

```bash
make
```

Aunque en este caso se generará un archivo de nombre
`lib{nombre-de-la-biblioteca}.a` en la subcarpeta `bin`:

```
utils
├── bin
│   └── libutils.a
└── obj
    └── utils
        └── hello.o
```

Este archivo deberá ser incluido en nuestro proyecto al momento de compilarlo
como veremos en la siguiente sección.

## Agregar una static library en un proyecto existente

### Linkear en el IDE o Editor de Texto

Antes de continuar con la configuración, necesitaremos
importar la biblioteca en nuestro IDE o editor de texto de preferencia:

::: details Guía para Visual Studio Code

1. Al igual que con cualquier otro proyecto, nos iremos a
`Archivo > Agregar carpeta al área de trabajo...` y seleccionaremos **la carpeta
de la biblioteca**. Nos va a quedar algo parecido a esto:

![explorer](/img/static/code-explorer.png)

2. Por último, vamos a editar el `includePath` **del proyecto que usa la
biblioteca** para que el autocompletado reconozca las funciones que se
encuentran allí:

::: code-group

<<< @/snippets/guia/code/c_cpp_properties.json {json:line-numbers}

¡Y listo! Ya podemos continuar con el tutorial

:::

::: details Guía para Eclipse

1. **Verificar el Workspace**

Para importar una biblioteca (estática o compartida), primero debemos
asegurarnos que el workspace sea
[el mismo que usamos para importar el proyecto](./importar-proyecto#eclipse):

![workspace-02](/img/eclipse/select-workspace-folder.png)

2. **Crear otro Makefile Project**

Luego, vamos a crear un nuevo Makefile Project de la misma forma que hicimos con
el [otro proyecto](./importar-proyecto#eclipse). Debe quedar así:

![static-01](/img/eclipse/project-explorer-with-utils.png)

3. **Vincular la biblioteca al proyecto**

Con la biblioteca ya importada veremos que el autocompletado no funciona si
intentamos llamar una función de la biblioteca:

![static-02](/img/eclipse/hello-world-not-working.png)

Para corregir esto, haremos click derecho **en el proyecto** e iremos a
`Properties`:

![static-03](/img/eclipse/properties.png)

Y en ese menú, iremos a `C/C++ General > Paths and Symbols > References` y
tildaremos la biblioteca como se ve en la captura:

![static-04](/img/eclipse/paths-and-symbols-references.png)

Ahora sí podremos utilizar el autocompletado para incluir las funciones de la
biblioteca:

![static-05](/img/eclipse/hello-world-working.png)

¡Y listo! Ya podemos continuar con el tutorial.

:::

### Linkear en la configuración

Una vez hecho esto, deberemos incluir la biblioteca en la variable
`LIBS` del archivo `settings.mk` al igual que con cualquier otra biblioteca.

Sin embargo, aún no terminamos, ya que la biblioteca no está instalada, por lo
que el [linker](https://linux.die.net/man/1/ld) (que es el programa encargado de
ir a buscar esa biblioteca) no va a encontrar nuestro archivo `libutils.a` a
menos que se lo indiquemos.

::: tip ¿Cómo funciona el flag "-l"?

Por defecto, el linker solamente va a buscar bibliotecas (static y shared) en
las siguientes tres rutas:

```
/lib
/usr/lib
/usr/local/lib
```

Por ejemplo, las commons se encuentran instaladas en `/usr/lib/libcommons.so`.

Se pueden agregar más rutas pasándole a `gcc` el flag `-L{path}` o editando la
variable de entorno `LIBRARY_PATH`.

:::

Por lo tanto, para poder vincularla en el proyecto debemos agregar **la ruta
hacia el proyecto** (sin el `bin`) a la variable `STATIC_LIBPATHS` del archivo
`settings.mk`:

```bash
# Libraries
LIBS=utils commons
# Custom libraries' paths
STATIC_LIBPATHS=../utils
```

::: warning ADVERTENCIA

Si la biblioteca que vamos a agregar depende de otras (por ejemplo, las
`commons`) debemos incluir su nombre **antes** que el de su dependencia como se
muestra arriba.

:::

Una vez compilemos con `make` veremos que se agregó el flag `-L{path}/bin` a
`gcc`:

```bash
gcc src/main.c -o "bin/ejemplo" -I../utils/src -L../utils/bin -lutils
```

### Incluir en el código

Hay dos formas de incluir los headers de la biblioteca en nuestro código. La más
"sucia" es utilizar rutas relativas entre comillas:

::: code-group

```c:line-numbers{1} [main.c]
#include "../../utils/src/utils/hello.h"

int main(void) {
  hello_world();
  return 0;
}
```

:::

Sin embargo, existe una mejor forma de hacerlo: la variable `STATIC_LIBPATHS`
que configuramos también permite que el makefile le indique al
[compilador](https://linux.die.net/man/1/gcc) que vaya a buscar los headers de
la biblioteca a la carpeta `src` donde se encuentran, agregando el flag
`-I{path}/src` como vimos más arriba.

::: tip ¿Cómo funciona el `#include`?

Por defecto, el compilador solamente va a buscar headers en las siguientes dos
rutas:

```
/usr/include
/usr/local/include
```

Por ejemplo, los headers de las commons se encuentran instalados en la carpeta
`/usr/include/commons`.

Se pueden agregar más rutas pasándole a `gcc` el flag `-I{path}` o editando la
variable de entorno `C_INCLUDE_PATH`.

:::

Por lo tanto, también podemos hacer el `#include` de esta forma:

::: code-group

```c:line-numbers{1} [main.c]
#include <utils/hello.h>

int main(void) {
  hello_world();
  return 0;
}
```
:::

::: tip TIP

El template permite agrupar el código en varias carpetas:

```
utils
 └── src
     ├── dto
     │   ├── handshake.c
     │   └── handshake.h
     ├── sockets
     │   ├── cliente.c
     │   ├── cliente.h
     │   ├── servidor.c
     │   └── servidor.h
     └── utils
         ├── string.c
         └── string.h
```
Para luego incluirlos evitando colisiones de nombres:

```c
#include <dto/handshake.h>
#include <sockets/cliente.h>
#include <sockets/servidor.h>
#include <utils/string.h>
#include <string.h>
```

:::

### Compilar el proyecto

Cada vez que ejecutes `make` desde el proyecto, no vas a necesitar acordarte de
ejecutar `make` en la biblioteca, ya que el makefile se va a encargar de hacerlo
en caso de que sea necesario.

También, cada vez que hagas un cambio en la biblioteca, todos los archivos del
proyecto que la incluye se van a recompilar para evitar inconsistencias.

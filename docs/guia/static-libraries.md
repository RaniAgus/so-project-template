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
repo
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

<!--@include: ./static-code.md-->

:::

::: details Guía para Eclipse

<!--@include: ./static-eclipse.md-->

:::

### Linkear en la configuración

Una vez hecho esto, deberemos incluir la biblioteca en la variable
`LIBS` del archivo `settings.mk` al igual que con cualquier otra biblioteca:

Sin embargo, aún no terminamos, ya que la biblioteca no está instalada, por lo
que el [linker](https://linux.die.net/man/1/ld) (que es el programa encargado de
ir a buscar esa biblioteca) no va a encontrar nuestro archivo `lib*.a` a menos
que se lo indiquemos.

::: tip ¿Cómo funciona el flag "-l"?

Por defecto, el linker solamente va a buscar bibliotecas (static y shared) en
las siguientes tres rutas:

```
/lib
/usr/lib
/usr/local/lib
```

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
`gcc`.

### Incluir en el código

Hay dos formas de incluir los headers de la biblioteca en nuestro código. La más
"sucia" es utilizar rutas relativas entre comillas:

```c{1}
#include "../../utils/src/utils/hello.h"

int main(void) {
  return hello_world();
}
```

Sin embargo, existe una mejor forma de hacerlo: la variable `STATIC_LIBPATHS`
que configuramos también permite que el makefile le indique al
[compilador](https://linux.die.net/man/1/gcc) que vaya a buscar los headers de
la biblioteca a la carpeta `src` donde se encuentran, agregando el flag
`-I{path}/src`.

::: tip ¿Cómo funciona el `#include`?

Por defecto, el compilador solamente va a buscar headers en las siguientes dos
rutas:

```
/usr/include
/usr/local/include
```

Se pueden agregar más rutas pasándole a `gcc` el flag `-I{path}` o editando la
variable de entorno `C_INCLUDE_PATH`.

:::

Por lo tanto, también podemos hacer el `#include` de esta forma:

```c{1}
#include <utils/hello.h>

int main(void) {
  return hello_world();
}
```

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

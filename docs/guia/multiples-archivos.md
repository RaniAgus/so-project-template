# Usar múltiples archivos

Los módulos suelen tener bastante código, por lo que dejar todo en un único
`main.c` nos puede resultar difícil de mantener.

Para evitar esto, podemos utilizar múltiples archivos.

## Ejemplo inicial

Supongamos que tenemos un `main.c` con un tipo `t_persona`:

<<< @/snippets/guia/multiples-archivos/inicial.c

Sería más organizado convertir el tipo `t_persona` en un Tipo Abstracto de Dato
(TAD) con las funciones asociadas:

- `persona_new`: Que cree una instancia de `t_persona`.
- `persona_to_string`: Que convierta una instancia de `t_persona` a string para
ser impresa por pantalla con `printf`, `puts` o cualquier función de logging.
- `persona_destroy`: Que libere toda la memoria ocupada por una instancia de
`t_persona`.

De esta forma, si en otra parte del código queremos crear a `cr7`, podemos
reutilizar la misma lógica que usamos para crear a `messi`.

## Crear un header

Para esto, primero crearemos un header en `/include`:

```bash
touch include/persona.h
```

En él vamos a guardar los prototipos de las funciones del nuevo TAD `t_persona`:

<<< @/snippets/guia/multiples-archivos/persona.h{c}

## Crear un archivo fuente

Luego, crearemos un archivo fuente:

```bash
touch src/persona.c
```

Y moveremos ahí la implementación de ese tipo abstracto de dato, junto con todas
las bibliotecas que necesita.

<<< @/snippets/guia/multiples-archivos/persona.c{1}

También es una buena práctica incluir al inicio su header, como se puede ver al
principio.

::: tip

Los makefiles, por defecto, incluyen el flag `-I./include` a la hora de compilar
el proyecto con `gcc`. De esta forma, se puede incluir cualquier header que se
encuentre en esa carpeta y sus subcarpetas utilizando corchetes angulares
`< >`.

Sin este flag, también se podría lograr el mismo resultado utilizando rutas
relativas entre comillas:

```c
#include "../include/persona.h"
```

:::

::: tip ¿Cómo funciona el "#include"?

Por defecto, el compilador solamente va a buscar headers en las siguientes dos
rutas:


```
/usr/include
/usr/local/include
```

Se pueden agregar más rutas pasándole a `gcc` el flag `-I{path}` o editando la
variable de entorno `C_INCLUDE_PATH`.

:::

## Incluir el archivo fuente en el `main.c`

Por último, vamos a hacer que nuestra función `main()` utilice las funciones del
nuevo TAD `t_persona` para crear a `messi`:

<<< @/snippets/guia/multiples-archivos/main.c{1,4,6,10}

En conclusión, nos quedó un `main()` mucho más simple y con un TAD que nos
permite crear nuevas instancias de `t_persona` en el proyecto de forma más
sencilla.

```
project
├── include
│   └── persona.h
├── src
│   ├── main.c
│   └── persona.c
├── makefile
└── settings.mk
```

::: warning Si estás usando Visual Studio Code...

Es probable que el autocompletado no reconozca las funciones que están en
`persona.h` y aparezca el warning:

```
#include errors detected. Please update your includePath.
```

Podés solucionar esto revisando [esta guía](code/include.md).

:::

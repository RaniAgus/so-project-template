# Usar múltiples archivos

Los módulos suelen tener bastante código, por lo que dejar todo en un único
`main.c` nos puede resultar difícil de mantener.

Para evitar esto, podemos utilizar múltiples archivos.

## Ejemplo inicial

Supongamos que tenemos un `main.c` con un tipo `t_persona`:

::: code-group

<<< @/snippets/guia/multiples-archivos/inicial.c {c:line-numbers} [main.c]

:::

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

Para esto, primero crearemos un header en la carpeta `src/` con nuestro editor
favorito o desde la consola ejecutando:

```bash
touch src/persona.h
```

En él vamos a guardar los prototipos de las funciones del nuevo TAD `t_persona`:

::: code-group

<<< @/snippets/guia/multiples-archivos/persona.h{c:line-numbers} [persona.h]

:::

::: tip

Nótese que definimos al tipo `t_persona` como un `struct persona` pero no
expusimos los atributos que lo conforman.[^1]

Si bien esto es completamente opcional, si en Paradigmas vieron el concepto de
[encapsulamiento](https://es.wikipedia.org/wiki/Encapsulamiento_(inform%C3%A1tica)),
esta es la forma más parecida de lograrlo en C, ya que impedimos que quienes
incluyan este header manipulen los atributos del `struct` directamente.

:::

## Crear un archivo fuente

Luego, crearemos un archivo fuente:

```bash
touch src/persona.c
```

Y moveremos ahí la implementación de ese TAD, junto con todas las bibliotecas
que necesita.

::: code-group

<<< @/snippets/guia/multiples-archivos/persona.c{1 c:line-numbers} [persona.c]

:::

También es una buena práctica incluir al inicio su header, como se puede ver al
principio.

::: tip

Los makefiles, por defecto, incluyen el flag `-I./src` a la hora de compilar
el proyecto con `gcc`. De esta forma, se puede incluir cualquier header que se
encuentre en esa carpeta y sus subcarpetas utilizando corchetes angulares
`< >` como en el ejemplo de arriba.

Sin este flag, también se podría lograr el mismo resultado utilizando rutas
relativas entre comillas:

```c
#include "../src/persona.h"
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

::: code-group

<<< @/snippets/guia/multiples-archivos/main.c{3,6,8,12 c:line-numbers} [main.c]

:::

En conclusión, nos quedó un `main()` mucho más simple y con un TAD que nos
permite crear nuevas instancias de `t_persona` en el proyecto de forma más
sencilla.

```
.
└── src
    ├── main.c
    ├── persona.c
    └── persona.h
```

[^1]: Esta forma de declarar tipos de conoce como _Opaque Types_, si quieren
entrar más en detalle les recomendamos
[este video (en inglés)](https://www.youtube.com/watch?v=TsUOhPsZk6k).

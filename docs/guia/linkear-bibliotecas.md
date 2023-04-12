# Agregar bibliotecas

Para acceder a funciones de algunas bibliotecas (como las `commons`, `pthread` o
`readline`) hace falta avisarle al [linker](https://linux.die.net/man/1/ld) que
las vincule al momento de compilar.

Por ejemplo, si intentamos compilar este código:

::: code-group

<<< @/snippets/guia/primeros-pasos/commons.c{3 c:line-numbers} [main.c]

:::

Nos aparecerá el error:

```bash
undefined reference to 'list_create'
undefined reference to 'list_add'
undefined reference to 'list_add'
undefined reference to 'list_add'
undefined reference to 'list_add'
undefined reference to 'list_iterate'
```

Para agregar una biblioteca debemos editar la variable `LIBS` del archivo
`settings.mk` del proyecto. Por ejemplo:

```bash
# Libraries
LIBS=commons
```

Si queremos agregar más de una, cada nombre debe ir separado por espacios.

::: tip ¿Qué hicimos al editar esta variable?

Editar la variable `LIBS` permite incluir el flag `-l` para _linkear_ la
biblioteca que queremos usar al momento de la compilación con `gcc`. Al
ejecutar `make` veremos algo como:

```bash
gcc -o bin/ejemplo.out src/main.c -lcommons
```

Ese `-lcommons` es lo que agregamos al editar `LIBS`.

:::

::: tip ¿Cómo funciona el flag "-l"?

Por defecto, el linker solamente va a buscar bibliotecas en las siguientes tres
rutas:

```
/lib
/usr/lib
/usr/local/lib
```

Se pueden agregar más rutas pasándole a `gcc` el flag `-L{ruta-a-biblioteca}` o
editando la variable de entorno[^1] `LIBRARY_PATH`.

:::

[^1]: Si te estás preguntando: _"¿qué c&@$#/°s es una variable de entorno?"_
No te preocupes, podés encontrar una explicación simple en nuestra
[guía de Bash](https://docs.utnso.com.ar/guias/consola/bash#variables-de-entorno)

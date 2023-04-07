# Pasar argumentos a `main()`

::: tip

Antes de continuar, te recomiendo haber leído primero la guía de
[Argumentos para el main](https://docs.utnso.com.ar/guias/programacion/main).

:::

Es probable que para el TP requieran pasar argumentos a `main()` para, por
ejemplo, parametrizar el archivo config que se va a utilizar:

```bash
./bin/ejemplo.out ejemplo.config
```

Y recibir el path hacia el archivo config en la función `config_create()`:

::: code-group

<<< @/snippets/guia/args/args.c{11 c:line-numbers} [main.c]

:::

Sin embargo, para poder ejecutar el programa con todos sus parámetros desde un
IDE o al hacer uso de los [comandos para Valgrind](./valgrind) vamos a
necesitar entrar a la configuración de ejecución.

## Ejecutar desde Eclipse

Vamos a entrar a las `Run Configurations...`:

![eclipse-01](/img/args/eclipse-01.png)

Y en la configuración del proyecto nos moveremos a la pestaña `Arguments`, en
donde vamos a poner nuestros argumentos separados por espacios:

![eclipse-02](/img/args/eclipse-02.png)

## Ejecutar desde Visual Studio Code

Vamos a buscar la variable `args` del archivo `launch.json`, y vamos a editar la
lista de argumentos en formato de array de strings de la siguiente forma:

::: code-group

<<< @/snippets/guia/args/launch.json {json:line-numbers}

:::

## Ejecutar desde la consola

Debemos agregar los argumentos a la variable `ARGS` del archivo `settings.mk`:

```makefile
# Arguments when executing with start, memcheck or helgrind
ARGS=ejemplo.config
```

Esto nos será útil para cuando querramos [ejecutar con Valgrind](./valgrind.md).

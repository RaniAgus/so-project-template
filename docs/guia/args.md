# Pasar argumentos a `main()`

Es probable que para el TP requieran pasar argumentos a `main()` para, por
ejemplo, parametrizar el archivo config que se va a utilizar:

```bash
./bin/project.out project.config
```

Y recibir el path hacia el archivo config en la función `config_create()`:

<<< @/snippets/guia/args/args.c{11}

Sin embargo, para poder ejecutar el programa con todos sus parámetros desde un
IDE o al hacer uso de los [comandos para valgrind](./valgrind) vamos a
necesitar entrar a la configuración de ejecución.

## Ejecutar desde Eclipse

Vamos a entrar a las `Run Configurations...`:

![eclipse-01](/img/args/eclipse-01.png)

Y en la configuración del proyecto nos moveremos a la pestaña `Arguments`, en
donde vamos a poner nuestros argumentos separados por espacios:

![eclipse-02](/img/args/eclipse-02.png)

## Ejecutar desde Visual Studio Code

Vamos a editar la variable `args` del archivo `launch.json`, en donde vamos a
poner nuestra lista de argumentos en formato de array de strings:

<<< @/snippets/guia/args/launch.json{12}

## Ejecutar desde la consola

Debemos agregar los argumentos a la variable `ARGS` del archivo `settings.mk`:

```makefile
# Arguments when executing with start, memcheck or helgrind
ARGS=project.config
```

Para más info podés visitar la [guía de uso de Valgrind](./valgrind.md).

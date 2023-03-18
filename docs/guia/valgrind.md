# Uso de Valgrind

::: tip

Para saber qué es Valgrind y para qué sirven Memcheck y Helgrind, te recomiendo
haber visto [esta guía](https://docs.utnso.com.ar/guias/herramientas/valgrind).

:::

## Chequear el uso de memoria con Memcheck

Para ejecutar Valgrind en modo `--leak-check=full`, los makefiles cuentan con
una regla `memcheck`:

```bash
make memcheck
```
Este comando se puede configurar editando la regla `MEMCHECK_FLAGS` del archivo
`settings.mk`:

```makefile
# Valgrind flags
MEMCHECK_FLAGS=--track-origins=yes --log-file="memcheck.log"
```

## Chequear condiciones de carrera con Helgrind

Para ejecutar Valgrind en modo `--tool=helgrind`, los makefiles cuentan con
una regla `helgrind`:

```bash
make helgrind
```
Este comando se puede configurar editando la regla `HELGRIND_FLAGS` del archivo
`settings.mk`:

```makefile
# Valgrind flags
HELGRIND_FLAGS=--log-file="helgrind.log"
```

## Imprimir stack traces con Nulgrind

Valgrind provee una función que nos permite imprimir stack traces mientras
estemos utilizando cualquiera de sus modos a través de su biblioteca:

```c
#include <valgrind/valgrind.h>
```

Esta función se llama `VALGRIND_PRINTF_BACKTRACE` y permite darle formato de la
misma forma que `printf` y los logs de las commons:

```c{4}
#include <valgrind/valgrind.h>

void funcion(char *str, int i) {
    VALGRIND_PRINTF_BACKTRACE("%s: %d\n", str, i);
}

int main() {
    funcion("Hola Mundo", 42);
    return 0;
}
```
Sin embargo, este stacktrace solamente se imprime mientras utilicemos
`valgrind`, por lo que si compilamos este código y e intentamos ejecutarlo desde
la consola no se va a imprimir nada.

Por lo tanto, los makefiles también incluyen una regla `start` para ejecutar el
proyecto con Valgrind en su modo más minimalista:
[Nulgrind](https://valgrind.org/docs/manual/nl-manual.html)
```bash
make start
```

De esta forma, vamos a poder imprimir el stack trace correctamente:
```
********* Hola Mundo: 42
=========    at 0x10938B: VALGRIND_PRINTF_BACKTRACE (valgrind.h:6808)
=========    by 0x1093F3: funcion (main.c:4)
=========    by 0x109412: main (main.c:8)
```

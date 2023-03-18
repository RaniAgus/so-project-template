# Configurar `gcc`

Se puede cambiar los flags que se le pasen a `gcc` editando dos variables que
pertenecen a configuraciones distintas (una para el desarrollo y otra para la
entrega).

Por defecto se incluye lo siguiente:

```makefile
# Compiler flags
CDEBUG=-g -Wall -DDEBUG
CRELEASE=-O3 -Wall -DNDEBUG
```

- Cuando se compila con `make all`, se utilizan los flags de `CDEBUG`.
- Cuando se compila con `make release`, se utilizan los flags de `CRELEASE`.

De esta forma, si querés agregarle optimizaciones o definir macros de
preprocesador, este es el lugar para hacerlo.

Para más info sobre los flags que se pueden configurar para `gcc`, te aconsejo
arrancar por [esta página](https://www.rapidtables.com/code/linux/gcc.html).
También podés revisar la
[docu oficial](https://gcc.gnu.org/onlinedocs/gcc-9.1.0/gcc/Invoking-GCC.html#Invoking-GCC).

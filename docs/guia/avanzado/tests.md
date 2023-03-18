<script setup>
import { version } from '../../../package.json'
</script>

# Agregar tests unitarios

Si bien no es obligatorio agregar tests unitarios al código del TP, contar con
ellos nos puede ahorrar un montón de tiempo a la hora de validar que los módulos
cumplan con el comportamiento esperado, sobre todo cuando toca agregar
funcionalidades nuevas sobre código ya probado.

Es por eso que también se incluye, entre los templates, uno que permite testear
**cualquier** tipo de proyecto del TP (ya sea un módulo o una biblioteca).

## Crear el proyecto

Para crear un proyecto de tests unitarios, primero podés decidir en qué carpeta
crearlo. Se sugieren dos opciones:

### Opción 1: en una subcarpeta `tests` dentro de cada proyecto o biblioteca

Esta configuración es recomendada para Visual Studio Code, ya que no requiere
importar nuevas carpetas al workspace y se pueden crear tasks para, por ejemplo,
correr los tests antes de ejecutar.

```bash
project
├── bin
│   └── project.out
├── include
├── makefile
├── settings.mk
├── src
│   └── main.c
└── tests # <-- Acá
```

```bash
mkdir project/tests && cd project/tests
```
### Opción 2: en una carpeta aparte del repo

Esta configuración es recomendada para Eclipse, ya que al importar desde
Makefile se evita contar con archivos repetidos en un mismo workspace.

```bash
.
├── project
│   ├── bin
│   │   └── project.out
│   ├── include
│   ├── makefile
│   ├── settings.mk
│   └── src
│       └── main.c
└── tests
    ├── project-tests # <-- Acá
    └── ...
```

```bash
mkdir tests tests/project-tests && cd tests/project-tests
```

## Descargar el template

```bash-vue
wget -qO- https://github.com/RaniAgus/so-project-template/releases/download/v{{version}}/tests-v{{version}}.tar.gz \
  | tar -xzvf - --strip-components 1
```
```
tests
├── include
│   └── .gitkeep
├── src
│   └── example.c
├── makefile
└── settings.mk
```

## Configurar el template

### Especificar en qué ruta se encuentra el proyecto a testear

Opción 1:
```makefile
# Original project path
PROJ_PATH=..
```

Opción 2:
```makefile
# Original project path
PROJ_PATH=../../project
```

### Configurar las bibliotecas

Además de incluir las bibliotecas que usa el proyecto original, acá podés
especificar qué biblioteca o framework vas a usar.

En este caso lo vamos a configurar para
[CSpec](https://docs.utnso.com.ar/guias/herramientas/cspec).

```makefile
# Libraries
LIBS=cspecs

# Custom libraries' paths
SHARED_LIBPATHS=
STATIC_LIBPATHS=
```

### Excluir archivos fuente

Por último, en caso de que estemos testeando un módulo con una función `main()`,
debemos configurar el makefile para que excluya este archivo:

```makefile
# Excluded source files (eg: main() function)
EXCLUDE=main.c
```

Ya que, de otra forma, nos va a parecer el error:

```
error: redefinition of 'main'
```

::: warning IMPORTANTE

A la hora de excluir archivos fuente del proyecto de tests, es importante
revisar que ninguna función o variable global sea incluida dentro de los demás
archivos.

:::

En general es una buena práctica que el archivo fuente que contiene la función
`main()` sea reducido y solamente contenga la lógica más _core_ de la
aplicación, delegando cada tarea a otras funciones de otros archivos fuente, que
sí van a estar disponibles para ser testeadas.

## Compilar el proyecto

Un proyecto de tests tiene las mismas features para compilar y ejecutar que un
proyecto común (`all`, `watch`, `start`, `memcheck`, `helgrind` y `daemon`).

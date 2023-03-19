# Visual Studio Code

En este artículo explicaremos en más detalle la configuración de Visual Studio
Code provista por defecto en los templates.

```
.vscode
├── c_cpp_properties.json # Configuración del plugin de C/C++
├── launch.json           # Configuración del debugger
└── tasks.json            # Configuración de compilación
```

## Configuración de compilación

El primer archivo del que vamos a hablar es el `tasks.json`. En él vamos a
guardar tareas para compilar nuestro proyecto ejemplo usando `make all`.

El mismo cuenta con una task especificando lo siguiente:

<<< @/../src/project/.vscode/tasks.json#build{json:line-numbers}

- `label`: El nombre de la tarea, para poder identificarla.
- `command`: Que el comando a ejecutar sea `make all`, partiendo desde la
carpeta donde se encuentra el proyecto.
- `shell`: Que la tarea se va a ejecutar en una consola.
- `group`: Que la tarea sea de tipo "compilación" (`build`) y sea la tarea por
defecto para compilar ese proyecto.
- `problemMatcher`: Que los errores que pueden llegar a surgir provienen de
ejecutar `gcc`.

::: tip

Para saber más sobre cómo configurar el archivo `tasks.json`, podés revisar la
[documentación oficial](https://code.visualstudio.com/docs/editor/tasks#vscode).

:::

## Configuración del debugger

La configuración del debugger se encuentra dentro del archivo `launch.json`, en
el cual se indica, entre otras cosas:

<<< @/../src/project/.vscode/launch.json#run{2,5,6-8,9,10,12,21 json:line-numbers}

- `name`: El nombre de la configuración, que será el mismo que nos aparece a la
derecha en la sección `Run and Debug`, seguido por el nombre del proyecto entre
paréntesis:

![run configurations](/img/code/run-configurations.png)

- `program`: La ruta hacia el ejecutable, usando dos variables
  - `workspaceFolder`: Es la carpeta desde la cual abrimos nuestro proyecto
  - `workspaceFolderBasename`: Es el nombre de esa misma carpeta
- `args`: Los argumentos que le pasaremos a la función `main()`[^1].
- `stopAtEntry`: Acá podemos especificar que se detenga en la primera línea al
iniciar el debugger de la misma forma que lo hace Eclipse (por defecto, no se
detiene).
- `cwd`: El Current Working Directory[^2] de nuestro proceso. En este caso,
también `workspaceFolder`.
- `externalConsole`: Que no se use una consola externa para debuggear. Esto nos
permite conservar el output una vez que el proceso se cierre.
- `preLaunchTask`: Que antes de ejecutar se compile el proyecto usando la tarea
que creamos recién. Es muy importante usar el mismo campo `label` que hayamos
elegido anteriormente (en nuestro caso, `make-project`).

::: tip

Para saber más sobre cómo configurar el archivo `launch.json`, podés revisar la
[documentación oficial](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations).

:::


## Configuración del plugin de C/C++

Por último, el
[plugin de C/C++ de VSCode](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
también cuenta con sus configuraciones extra para que el corrector detecte
posibles bugs. Veamos cómo está conformado `c_cpp_properties.json`:

<<< @/../src/project/.vscode/c_cpp_properties.json{7-10 json:line-numbers}

Entre todos los atributos que se encuentran ahí, el único que nos va a interesar
es el `includePath`.

Como Visual Studio Code no sabe cómo vamos a compilar nuestro proyecto, esta es
la forma que tenemos de indicarle rutas extra desde las cuales buscar archivos
`*.h`.

Por defecto, ya se encuentra definido `"${workspaceFolder}/src"`, por lo que
podemos [incluir archivos de dentro del proyecto](../multiples-archivos.md)
sin errores.

Si queremos también incluir [bibliotecas externas](../static-libraries.md) que
no se encuentren instaladas, deberemos agregarlas manualmente.

::: tip

Podemos aprovechar la variable `workspaceFolder` para especificar unar ruta
relativa al proyecto, por ejemplo:

```json
"${workspaceFolder}/../utils/src"
```

:::

[^1]: Más info en nuestra
[guía de argumentos para `main()`](https://docs.utnso.com.ar/guias/programacion/main)

[^2]: _¡¿El qué?!_. El directorio desde el cual se va a ejecutar nuestro código.
Desde el mismo de van a calcular todas nuestras
[rutas relativas](https://docs.utnso.com.ar/guias/consola/rutas.html#current-working-directory).

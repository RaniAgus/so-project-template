# Importar un proyecto

## Agregar el proyecto al workspace

Primero, vamos a irnos a `File > Add Folder to Workspace...`

![project-01](https://user-images.githubusercontent.com/39303639/197107912-7e2c49cc-efcb-45ef-8dce-c7b9c75c9027.png)

Y seleccionaremos **la carpeta del proyecto**. Nos debe quedar algo parecido a
esto:

![project-02](/img/code/project-02.png)

::: tip

Podemos guardar el workspace a través de `File > Save Workspace As...`

:::

## Configuración de VSCode

Dentro de **cada carpeta del proyecto**, vamos a crear una subcarpeta `.vscode`,
que será la encargada de guardar todos los archivos de configuración de Visual
Studio Code.

::: warning IMPORTANTE

A continuación se van a mostrar un par de ejemplos de archivos de configuración
a modo de ejemplo para un proyecto llamado `project`.

Recomiendo ampliamente copiarlos y pegarlos **a consciencia**, cada atributo
importante se encuentra explicado debajo del ejemplo.

En caso de haber dudas, también se encuentra referenciada la documentación
oficial.

:::

## Configurar la compilación

El primer archivo que vamos a crear se va a llamar `tasks.json`. En él vamos a
guardar tareas para compilar nuestro proyecto ejemplo usando `make all`.

Dentro del mismo agregaremos una task especificando lo siguiente:

<<< @/snippets/guia/code/project/tasks.json{7}

- `label`: El nombre de la tarea. Recomiendo ponerle un nombre que coincida
  con el del proyecto para poder identificarla.
- `command`: Que el comando a ejecutar sea `make all`, desde la carpeta donde se
encuentra el proyecto.
- `shell`: Que la tarea se va a ejecutar en una consola.
- `group`: Que la tarea sea de tipo `build` y sea la tarea por defecto para
compilar ese proyecto.
- `problemMatcher`: Que los errores que pueden llegar a surgir provienen de
ejecutar `gcc`.

::: tip

Para saber más sobre cómo configurar el archivo `tasks.json`, podés revisar la
[documentación oficial](https://code.visualstudio.com/docs/editor/tasks#vscode).

:::

Entonces, con esto ya podremos compilar el proyecto presionando `Ctrl+Shift+B` o
a través de `Terminal > Run Build Task...`:


![project-06](https://user-images.githubusercontent.com/39303639/197194695-9e079198-3313-42d9-a20e-ce04580f778f.png)
![project-07](/img/code/project-07.png)

<!--
::: warning ADVERTENCIA

En caso de que aparezca el mensaje:
```
No se encontraron tareas de compilación para ejecutar. Configurar tareas de compilación...
```
Deberás reiniciar VSCode para poder efectuar los cambios.

:::
-->

## Configurar el Debugger

Por último, vamos a configurar el debugger. Para esto, vamos a abrir un archivo
de código C y buscar arriba a la derecha una ruedita ⚙️ al lado del botón de
play que diga `Add Debug Configuration`:

![project-08](https://user-images.githubusercontent.com/39303639/197196025-5f3dc146-e9f4-4f7c-85fe-ae3fc122a179.png)

Al hacer click nos aparecerán varias opciones, de las cuales elegiremos
`(gdb) Launch`:

![project-09](https://user-images.githubusercontent.com/39303639/197196325-e4ed78ca-9e25-4936-8387-d30ecd795f13.png)


Esto nos va a crear un nuevo archivo `launch.json`, en el cual debemos indicar:

<<< @/snippets/guia/code/project/launch.json{8,11,13,14,16,25}

- `name`: El nombre de la configuración, que será el mismo que nos aparece a la
derecha en la sección `Run and Debug`:

![image](https://user-images.githubusercontent.com/39303639/197197323-b7c10812-20ee-4d52-bb72-3e77bce5c582.png)

- `program`: La ruta hacia el ejecutable, usando dos variables
  - `workspaceFolder`: Es la carpeta desde la cual abrimos nuestro proyecto
  - `workspaceFolderBasename`: Es el nombre de esa misma carpeta
- `stopAtEntry`: Que se detenga en la primera línea al iniciar el debugger de la
misma forma que lo hace Eclipse (opcional).
- `cwd`: El
[Current working directory](https://docs.utnso.com.ar/guias/consola/rutas.html#current-working-directory)
de nuestro proceso. En este caso, también `workspaceFolder`.
- `externalConsole`: Que no se use una consola externa para debuggear. Esto nos
permite conservar el output una vez que el proceso se cierre.
- `preLaunchTask`: Que antes de ejecutar se compile el proyecto usando la tarea
que creamos recién. Es muy importante usar el mismo campo `label` que hayamos 
elegido anteriormente (en nuestro caso, `make-project`).

::: tip

Para saber más sobre cómo configurar el archivo `launch.json`, podés revisar la
[documentación oficial](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations).

:::

Ahora sí, podremos ver que el debugger funciona correctamente:

![project-10](/img/code/project-10.png)


## Cierre

Ya tenemos todo listo para empezar a desarrollar el TP en un único archivo
`main.c` y podemos continuar con la guía de 
[primeros pasos](/guia/#importar-el-proyecto-en-un-ide-o-editor-de-texto) :tada:

::: tip SPOILER

Una vez avancemos con el desarrollo, muy probablemente necesitemos 
[usar múltiples archivos](/guia/multiples-archivos) para tener el código mejor
organizado. 

En la siguiente guía explicaremos cómo hacer que Visual Studio Code encuentre
esos archivos y las definiciones de funciones que se encuentran en ellos.

:::
# Importar un proyecto

## Configurar el Workspace

Para importar un proyecto, primero vamos a cambiar la ruta del Workspace para
que apunte a nuestro repo. Para esto, iremos a
`File > Switch Workspace > Other...`:

![workspace-01](/img/eclipse/workspace-01.png)

Y luego, seleccionaremos la ruta ayudándonos con el botón `Browse...`, y haremos
click en `Launch`:

![workspace-02](/img/eclipse/workspace-02.png)

## Crear un Makefile Project

Empezaremos creando el proyecto de Eclipse a través de la opción
`File > New > Makefile Project with existing code`:

![project-01](/img/eclipse/project-01.png)

Si no aparece ahí, también la pueden encontrar en
`File > New > Other...` y buscando "makefile":

![project-02](/img/eclipse/project-02.png)


Luego, seleccionaremos la carpeta del proyecto ayudándonos con el botón
`Browse...` y dejaremos todo tildado como en la imagen:

![project-03](/img/eclipse/project-03.png)

Nos aparecerá la carpeta del proyecto en el `Solution Explorer` de Eclipse:

![project-04](/img/eclipse/project-04.png)

## Compilar y ejecutar el proyecto

Por último, compilaremos con el martillito :hammer: y ejecutaremos con el botón
play :arrow_forward:. Eclipse se va a encargar de buscar el ejecutable generado.

En caso de que no funcione el botón de play, nos iremos a la pestaña de al lado
y haremos click en `Run Configurations...`:

![project-05](/img/eclipse/project-05.png)

Luego, click **derecho** en `C/C++ Application`, y después click en `New...`:

![project-06](/img/eclipse/project-06.png)

Y, por último, en la nueva configuración apuntaremos hacia `bin/{name}.out` como
en el ejemplo:

![project-07](/img/eclipse/project-07.png)

¡Y listo!

![project-08](/img/eclipse/project-08.png)


## Sobre los archivos generados por Eclipse

Los archivos que Eclipse genera para configurar el proyecto funcionan utilizando
rutas absolutas (ej: `/home/utnso/Documents/tp-2022-1c-Ayudantes`), por lo que
recomiendo evitar subir al repositorio estos archivos a la hora de trabajar en
grupo.

Para esto, podemos agregar el siguiente texto al final del archivo `.gitignore`
que se encuentra en la carpeta base del repo (si no existe, crearlo):

```bash
# Eclipse files
**/RemoteSystemsTempFiles/
**/.settings/
**/.cproject
**/.project
```

Entonces, la próxima vez que hagamos `git status` veremos que los archivos
generados por Eclipse no van a estar disponibles para ser agregados con
`git add`.

Dicho esto, volvamos a la
[guía de primeros pasos](../#importar-el-proyecto-en-un-ide-o-editor-de-texto).

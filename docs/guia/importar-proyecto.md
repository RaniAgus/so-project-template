
# Importar el proyecto

Las opciones disponibles por defecto en las VMs para importar un proyecto C son
las siguientes:

- [Visual Studio Code](#visual-studio-code): Editor de texto liviano altamente
extensible. Recomendado si ya tenés alguna experiencia desarrollando en
algún lenguaje.

- [Eclipse IDE](#eclipse): Entorno gráfico integrado recomendado para
principiantes.

## Visual Studio Code

::: warning

Si llegás a tener algún problema a lo largo de esta guía o querés saber más
sobre cómo modificar la configuración de Visual Studio Code, te invito a revisar
primero la [explicación detallada de cada archivo](./avanzado/code).

:::

Todos los templates incluyen una carpeta oculta `.vscode` con las
configuraciones mínimas necesarias para levantar el proyecto y ejecutarlo con el
debugger integrado:

```
.vscode
├── c_cpp_properties.json
├── launch.json
└── tasks.json
```

Para importarlo por primera vez, vamos a irnos a
`File > Add Folder to Workspace...`

![add-folder](/img/importar-proyecto/code-add-folder.png)

Y seleccionaremos la carpeta de **cada proyecto por separado** (ej: client y
server). En las pestañas de explorer y debug nos debe quedar algo parecido a
esto:

![explorer](/img/importar-proyecto/code-explorer.png)
![run configurations](/img/importar-proyecto/code-run-configurations.png)

### Cómo compilar

Con esto ya podremos compilar el proyecto presionando `Ctrl+Shift+B` o
a través de `Terminal > Run Build Task...`:

![run-build-task](/img/importar-proyecto/code-run-build-task.png)
![build](/img/importar-proyecto/code-build.png)

### Cómo ejecutar

Para ejecutar el proyecto, nos movemos hacia la pestaña de `Run and Debug`,
seleccionamos la opción `run (nombre-del-proyecto)` y le damos al botón play
:arrow_forward:

![run configurations](/img/importar-proyecto/code-run-configurations.png)

::: tip

El proyecto ya se encuentra configurado para compilar con `make all` antes de
ejecutar.

:::

### Cómo guardar el workspace

Por último, para guardar el workspace y que todo el grupo pueda importarlo,
vamos a ir a la opción `File > Save Workspace As...` y ahí sí lo guardaremos en
**la carpeta raíz del repositorio** donde se encuentren todos los proyectos,
ejemplo:

```
.
├── tp.code-workspace
├── client
│   ├── makefile
│   ├── settings.mk
│   ├── .vscode
│   │   └── ...
│   └── src
│       └── ...
├── server
│   ├── makefile
│   ├── settings.mk
│   ├── .vscode
│   │   └── ...
│   └── src
│       └── ...
└── ...
```

Antes de terminar, al archivo `tp.code-workspace` recién creado le agregaremos
la siguiente configuración:

::: code-group

```json:line-numbers [tp.code-workspace]
{
	"settings": { // [!code ++]
		"debug.onTaskErrors": "abort", // [!code ++]
		"files.associations": { // [!code ++]
			"*.h": "c", // [!code ++]
		}, // [!code ++]
		"C_Cpp.errorSquiggles": "disabled", // [!code ++]
	}, // [!code ++]
	"folders": [
		{
			"name": "client",
			"path": "client"
		},
		{
			"name": "server",
			"path": "server"
		},
	]
}
```
- `debug.onTaskErrors` nos permite definir la acción a realizar en caso de que
   alguna tarea previa a ejecutar el debugger falle (en nuestro caso,
	 compilarlo). Elegí abortar la ejecución ya que no queremos estar
	 debuggeando sobre una versión desactualizada del proyecto si éste no compila.

- `files.associations` nos sirve para que el editor reconozca todos los
   archivos `*.h` como código C (y no código C++, que es el valor por defecto).

- `C_Cpp.errorSquiggles` nos permite deshabilitar algunos mensajes de error que
   nos pueden llegar a aparecer por utilizar algunas features de `gcc` que no
   forman parte del estándar de C[^1], como por ejemplo las
   [nested functions](https://www.youtube.com/watch?v=1kYyxZXGjp0). Además,
   esto permite que el editor tome en cuenta solo los errores al compilar, que
   son los verdaderamente importantes.

¡Y listo! Una vez hecho esto, podemos commitear el archivo `tp.code-workspace` para
que nuestros compañeros de grupo puedan importar el workspace directamente.

Con esto, ya podemos continuar con la guía, el siguiente paso va a ser
[agregar bibliotecas externas](./linkear-bibliotecas).

## Eclipse

::: warning

Recomiendo que cada integrante haga esta configuración por separado, ya que, como
veremos más adelante, commitear los archivos generados por Eclipse puede traernos
problemas a futuro.

:::

### Configurar el Workspace

Para importar un proyecto, primero vamos a cambiar la ruta del Workspace para
que apunte a nuestro repo. Para esto, iremos a
`File > Switch Workspace > Other...`:

![workspace-01](/img/eclipse/switch-workspace.png)

Y luego, seleccionaremos la ruta ayudándonos con el botón `Browse...`, y haremos
click en `Launch`:

![workspace-02](/img/eclipse/select-workspace-folder.png)

### Crear un Makefile Project

Empezaremos creando el proyecto de Eclipse a través de la opción
`File > New > Makefile Project with existing code`:

![project-01](/img/eclipse/file-new-makefile-project.png)

::: warning

Si no aparece ahí, también la pueden encontrar en
`File > New > Other...` y buscando "makefile":

![project-02](/img/eclipse/select-a-wizard.png)

:::

Luego, seleccionaremos la carpeta del proyecto ayudándonos con el botón
`Browse...` y dejaremos todo tildado como en la imagen:

![project-03](/img/eclipse/import-existing-code.png)

Nos aparecerá la carpeta del proyecto en el `Project Explorer` de Eclipse:

![project-04](/img/eclipse/project-explorer.png)

### Compilar y ejecutar el proyecto

Por último, vamos a generar las configuraciones necesarias para poder compilar
y ejecutar el proyecto.

Primero, desde el `Project Explorer` haremos click derecho sobre la carpeta de
nuestro proyecto y luego haremos click en `Build Project`:

![run-config](/img/eclipse/build-project.png)

Esto nos generará el ejecutable en la carpeta `bin`:

![project-explorer-with-bin](/img/eclipse/project-explorer-with-bin.png)

Ahora, haremos click derecho sobre ese ejecutable e iremos a `Run As` >
`Local C/C++ Application`:

![run-config](/img/eclipse/run-as-local-c-cpp-application.png)

 Ya logramos ejecutar nuestro proyecto:

![project-08](/img/eclipse/run-console.png)

¡Y listo! Arriba a la izquierda ya se nos generó una configuración por defecto
que podemos utilizar para compilar con :hammer:, ejecutar con :arrow_forward: o
usar el debugger :bug::

![run-panel](/img/eclipse/run-panel.png)

### Sobre los archivos generados por Eclipse

Los archivos que Eclipse genera para configurar el proyecto funcionan utilizando
rutas absolutas (ej: `/home/utnso/Documents/tp-2022-1c-Ayudantes`), por lo que
recomiendo evitar subir al repositorio estos archivos a la hora de trabajar en
grupo.

Para esto, podemos agregar el siguiente texto al final del archivo `.gitignore`
que se encuentra en la carpeta base del repo:

```bash
# Eclipse files
RemoteSystemsTempFiles/
.metadata/
.settings/
.cproject
.project
```

Entonces, la próxima vez que ejecutemos `git status` veremos que los archivos
generados por Eclipse no van a estar disponibles para ser agregados con
`git add`.

¡Y listo! Ya podemos continuar con la guía, el siguiente paso va a ser
[agregar bibliotecas externas](./linkear-bibliotecas).

[^1]: Existe una feature request al respecto en el repo de Visual Studio Code,
  les invitamos a dar su +1 para que se pueda incorporar esta feature en un
  futuro: [microsoft/vscode-cpptools#1035](https://github.com/microsoft/vscode-cpptools/issues/1035)

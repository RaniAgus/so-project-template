
# Importar el proyecto

Las opciones disponibles por defecto en las VMs para importar un proyecto C son
las siguientes:

- [Visual Studio Code](#visual-studio-code): Editor de texto liviano altamente
extensible. Recomendado si ya tenés alguna experiencia desarrollando en
algún lenguaje.

- [Eclipse IDE](#eclipse): Entorno gráfico integrado recomendado para
principiantes.

## Visual Studio Code

Todos los templates incluyen una carpeta oculta `.vscode` con las
configuraciones mínimas necesarias para levantar el proyecto y ejecutarlo con el
debugger integrado:

```
.vscode
├── c_cpp_properties.json
├── launch.json
└── tasks.json
```

Para importarlo, vamos a irnos a `File > Add Folder to Workspace...`

![project-01](https://user-images.githubusercontent.com/39303639/197107912-7e2c49cc-efcb-45ef-8dce-c7b9c75c9027.png)

Y seleccionaremos **la carpeta del proyecto**. Nos debe quedar algo parecido a
esto:

![project-02](/img/code/project-02.png)

Luego, para guardar el workspace y contar con él para más adelante, vamos a ir
a la opción `File > Save Workspace As...` y lo guardaremos en la carpeta raíz
del repositorio donde se encuentre el proyecto.

Por último, al archivo `*.code-workspace` recién creado le agregaremos la
siguiente configuración para que el editor reconozca todos los archivos `*.h`
como código C (y no código C++, que es el valor por defecto):

```json
{
	"folders": [
		{
			"name": "nombre-del-proyecto",
			"path": "nombre-del-proyecto"
		},
	],
	"settings": { // [!code ++]
		"files.associations": { // [!code ++]
			"*.h": "c", // [!code ++]
		}, // [!code ++]
	} // [!code ++]
}
```

::: warning

Si llegás a tener algún problema o querés saber más sobre cómo modificar la
configuración de Visual Studio Code, te invitamos a revisar primero la
[explicación detallada de cada archivo](./avanzado/code).

:::

### Cómo compilar

Con esto ya podremos compilar el proyecto presionando `Ctrl+Shift+B` o
a través de `Terminal > Run Build Task...`:


![project-06](https://user-images.githubusercontent.com/39303639/197194695-9e079198-3313-42d9-a20e-ce04580f778f.png)
![project-07](/img/code/project-07.png)

¡Y listo! Ya podemos continuar con la guía, el siguiente paso va a ser
[agregar bibliotecas externas](./linkear-bibliotecas).

## Eclipse


### Configurar el Workspace

Para importar un proyecto, primero vamos a cambiar la ruta del Workspace para
que apunte a nuestro repo. Para esto, iremos a
`File > Switch Workspace > Other...`:

![workspace-01](/img/eclipse/workspace-01.png)

Y luego, seleccionaremos la ruta ayudándonos con el botón `Browse...`, y haremos
click en `Launch`:

![workspace-02](/img/eclipse/workspace-02.png)

### Crear un Makefile Project

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

### Compilar y ejecutar el proyecto

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
.settings/
.cproject
.project
```

Entonces, la próxima vez que ejecutemos `git status` veremos que los archivos
generados por Eclipse no van a estar disponibles para ser agregados con
`git add`.

¡Y listo! Ya podemos continuar con la guía, el siguiente paso va a ser
[agregar bibliotecas externas](./linkear-bibliotecas).
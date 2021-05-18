# so-project-template
Template para facilitar la creación de proyectos en C con una biblioteca 
compartida.

## Features

Ambos makefiles:

✔️ Compilan solamente los archivos fuente necesarios, incluso detecta cuándo las
bibliotecas hechas por el usuario fueron modificadas para volver a compilar
todos los objetos.

✔️ Permiten el uso de subcarpetas.

✔️ Se pueden importar desde Eclipse, CLion, VSCode o cualquier editor de texto u
 entorno de desarrollo.

✔️ Permiten que el repo se pueda deployar usando el script 
[so-deploy](https://github.com/sisoputnfrba/so-deploy).

✔️ No requieren que se especifique el nombre del proyecto al que pertenecen 
(alcanza con copiar la carpeta `/project/` o `/utils/` y modificar su nombre para 
configurar el nombre del proyecto).

Además, el makefile del proyecto incluye:

✔️ Flags de debug para `make all` y flags de release para `make release`.

✔️ Ejecución con Valgrind mediante `make memcheck` y `make helgrind`.

## Uso

Hay un ejemplo de su uso en 
[este repo](https://github.com/RaniAgus/so-project-example). 

### Estructura de archivos

Los proyectos funcionan bajo la siguiente estructura, adaptada para que 
[so-deploy](https://github.com/sisoputnfrba/so-deploy) funcione:
```
.
│  
└─── <project1>/
|     └─── src/
|     └─── makefile
└─── <project2>/
|     └─── src/
|     └─── makefile
└─── ...
└─── <projectN>/
|     └─── src/
|     └─── makefile
└─── <staticLib>/
      └─── src/
      └─── makefile
```

### ¿Cómo creo mis proyectos?

- Para crear un proyecto estándar se deberá copiar la carpeta `/project/` y
renombrarla para configurar el nombre del proyecto. Luego, se deberán
[incluir las bibliotecas](#cómo-incluyo-una-library) que utilice.

- Para crear una static library se deberá hacer el mismo procedimiento, en este
caso mediante la carpeta `/utils/`. Luego, se deberá
[incluir esa library](#cómo-incluyo-una-library) en los proyectos que la
utilicen.

### ¿Cómo incluyo una library?

Para incluir una library alcanza con editar la macro `LIBRARIES` del makefile. 
También, para incluir una library propia se debe editar tanto `LIBRARIES` como 
`LIBRARY_PATHS`. 

Por ejemplo, para incluir las `commons` y una biblioteca propia llamada `utils`
ubicada en el mismo repo se deberá agregar lo siguiente:

```make
# Include libraries here
LIBRARIES=utils commons pthread

# Include custom library paths here
LIBRARY_PATHS=../utils
```

### ¿Cómo importo los proyectos en el IDE?

- Cómo importar en Eclipse: [#wiki/Eclipse](../../wiki/Eclipse)

## Contacto

Si encontrás algun error en los makefiles o tenés alguna sugerencia, ¡no dudes 
en levantar un issue en este repositorio!


# utnso-project
Template para facilitar la creación de proyectos en C con una biblioteca compartida.

## Features

Ambos makefiles:

✔️ Compilan solamente las dependencias necesarias (incluso se verifica si la shared library está actualizada).

✔️ Permiten el uso de subcarpetas.

✔️ Se pueden importar desde Eclipse, CLion, VSCode o cualquier editor de texto u entorno de desarrollo.

✔️ Permiten que el repo se pueda deployar usando el script [so-deploy](https://github.com/sisoputnfrba/so-deploy).

✔️ No requieren que se especifique el nombre del proyecto al que pertenecen (alcanza con copiar la carpeta `project/` o `utils/` y modificar su nombre para configurar el nombre del proyecto).

Además, el makefile del proyecto incluye:

✔️ Flags de debug para `make all` y flags de release para `make release`.

✔️ Ejecución con Valgrind mediante `make memcheck` y `make helgrind`.

## Uso

Hay un ejemplo de uso en [este repo](https://github.com/RaniAgus/utnso-project-example). 

### Requerimientos

Los proyectos funcionan bajo la siguiente estructura, adaptada para que [so-deploy](https://github.com/sisoputnfrba/so-deploy) funcione:
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
      └─── <staticLib>/
      └─── makefile
```

### ¿Cómo incluyo una library?

Para incluir una library alcanza con editar la macro `LIBRARIES` del makefile. También, para incluir una library propia se debe editar tanto `LIBRARIES` como `LIBRARY_PATHS`. Se puede ver un ejemplo [aquí](https://github.com/RaniAgus/utnso-project-example/commit/adc00988e951a6c2a4b07cdcd0412b40d5a2ef55).

## Contacto

Si encontrás algun error en los makefiles o tenés alguna sugerencia, ¡no dudes en levantar un issue en este repositorio!

# Entrega Final

Podemos desplegar los proyectos del repo con un solo comando usando el script de
deploy que se encuentra en
[so-deploy](https://github.com/sisoputnfrba/so-deploy).

```bash
git clone https://github.com/sisoputnfrba/so-deploy
cd so-deploy
```

Para esto, usaremos los flags:

- `-r=release` para compilar los proyectos con la regla `make release`.
- `-p=<project|staticlib>` para agregar una static library o un proyecto.

::: tip

El script también incluye flags para instalar dependencias extra o ejecutar
sobre otra ruta. Recomiendo revisar el
[readme del repositorio](https://github.com/sisoputnfrba/so-deploy/blob/master/README.md).

:::

## Ejemplo

```bash
./deploy.sh \
  -r=release                      `# Usar 'make release' para compilar`                      \
  -p=utils                        `# Compilar la static library 'utils'`                     \
  -p=consola -p=kernel -p=memoria `# Compilar los proyectos 'consola', "kernel' y 'memoria'` \
  tp-2022-2c-geck                 `# Clonar el repo sisoputnfrba/tp-2021-2c-carpinchOS`
```

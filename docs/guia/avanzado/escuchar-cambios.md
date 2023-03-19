# Escuchar cambios en el código

En otras tecnologías es muy común contar con herramientas que nos permitan
escuchar cambios en nuestros archivos fuente y disparar comandos que de otra
forma deberíamos ejecutar manualmente.

Para poder hacerlo en nuestro proyecto, debemos tener instalado
el paquete [`entr`](http://eradman.com/entrproject/). Se puede instalar
utilizando el gestor de paquetes de Debian, `apt`:

```bash
sudo apt install entr
```

## Watch

En otras tecnologías se conoce como
[`watch`](https://www.geeksforgeeks.org/node-js-fs-watch-method/) a una opción
que nos permite observar cambios en el código para inmediatamente buscar errores
de sintaxis o semántica.

En nuestro caso, lo usaremos para compilar con `make` cada vez que ocurra un
cambio en cualquier archivo que se encuentre en `./src`. Para esto,
ejecutaremos:

```bash
make watch
```

## Daemon

Un [daemon](https://www.npmjs.com/package/nodemon) es una herramienta que nos
permite reiniciar la aplicación cada vez que se guarden cambios en el código.

En nuestro caso, lo utilizaremos para recompilar y ejecutar el proyecto con
`make start` cada vez que ocurra un cambio. Para lograr esto, ejecutaremos:

```bash
make daemon
```
::: tip

Podés forzar un reinicio con `q` o finalizar el proceso con `Ctrl` + `C`.

:::

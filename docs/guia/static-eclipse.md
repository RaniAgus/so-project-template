1. **Verificar el Workspace**

Para importar una biblioteca (estática o compartida), primero debemos
asegurarnos que el workspace sea
[el mismo que usamos para importar el proyecto](./importar-proyecto#eclipse):

![workspace-02](/img/eclipse/workspace-02.png)

2. **Crear otro Makefile Project**

Luego, vamos a crear un nuevo Makefile Project de la misma forma que hicimos con
el [otro proyecto](./importar-proyecto#eclipse). Debe quedar así:

![static-01](/img/eclipse/static-01.png)

3. **Vincular la biblioteca al proyecto**

Con la biblioteca ya importada veremos que el autocompletado no funciona si
intentamos llamar una función de la biblioteca:

![static-02](/img/eclipse/static-02.png)

Para corregir esto, haremos click derecho **en el proyecto** e iremos a
`Properties`:

![static-03](/img/eclipse/static-03.png)

Y en ese menú, iremos a `C/C++ General > Paths and Symbols > References` y
tildaremos la biblioteca como se ve en la captura:

![static-04](/img/eclipse/static-04.png)

Ahora sí podremos utilizar el autocompletado para incluir las funciones de la
biblioteca:

![static-05](/img/eclipse/static-05.png)

¡Y listo! Ya podemos continuar con el tutorial.

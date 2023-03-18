# Incluir código de otros archivos

Al intentar incluir código de otros archivos utilizando Visual Studio Code,
es probable que el autocompletado no reconozca esas funciones y nos aparezca el
warning:

```
#include errors detected. Please update your includePath.
Squiggles are disabled for this translation unit
```

Para solucionarlo, nos dice que actualicemos el `includePath` :thinking:. Veamos
qué significa eso...

## Configurar `includePath`

Si intentamos hacer click en `Quick fix` nos va a sugerir editar la
configuración de `includePath` desde un menú, pero no vamos a ir por ahí ya que
ese menú tiene algunos problemas a la hora de guardar la configuración.

En su lugar, vamos a crear directamente el archivo `c_cpp_properties.json`, que
es donde se guarda el `includePath` (que, en nuestro caso, va a ser la carpeta
`include` que se encuentra en nuestro `workspaceFolder`):

<<< @/snippets/guia/code/project/c_cpp_properties.json{5-7}

¡Y listo! Ahora sí, cuando intentemos incluir las funciones de otros archivos
el autocompletado nos las va a sugerir:

![include-02](/img/code/include-02.png)

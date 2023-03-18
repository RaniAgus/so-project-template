export const sidebar = {
  '/guia/': [
    {
      text: 'Guía inicial',
      collapsible: true,
      items: [
        {
          text: 'Primeros pasos',
          link: '/guia/'
        },
        {
          text: 'Usar múltiples archivos',
          link: '/guia/multiples-archivos'
        },
        {
          text: 'Pasar argumentos a main',
          link: '/guia/args'
        },
        {
          text: 'Código común entre proyectos',
          link: '/guia/static-libraries'
        },
        {
          text: 'Uso de Valgrind',
          link: '/guia/valgrind'
        },
        {
          text: 'Entrega Final',
          link: '/guia/deploy'
        },
      ]
    },
    {
      text: 'Eclipse',
      collapsible: true,
      items: [
        {
          text: 'Importar un proyecto',
          link: '/guia/eclipse/project'
        },
        {
          text: 'Importar una biblioteca',
          link: '/guia/eclipse/static'
        },
      ]
    },
    {
      text: 'Visual Studio Code',
      collapsible: true,
      items: [
        {
          text: 'Importar un proyecto',
          link: '/guia/code/project'
        },
        {
          text: 'Incluir código de otros archivos',
          link: '/guia/code/include'
        },
        {
          text: 'Importar una biblioteca',
          link: '/guia/code/static'
        },
      ]
    },
    {
      text: 'Features avanzadas',
      collapsible: true,
      items: [
        {
          text: 'Shared Libraries',
          link: '/guia/shared-libraries'
        },
        {
          text: 'Escuchar cambios en el código',
          link: '/guia/avanzado/escuchar-cambios'
        },
        {
          text: 'Agregar tests unitarios',
          link: '/guia/avanzado/tests'
        },
        {
          text: 'Configurar gcc',
          link: '/guia/avanzado/gcc'
        },
      ],
    },
  ],
  '/comandos/': []
};

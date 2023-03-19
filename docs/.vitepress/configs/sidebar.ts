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
          text: 'Importar el proyecto',
          link: '/guia/importar-proyecto'
        },
        {
          text: 'Agregar bibliotecas',
          link: '/guia/linkear-bibliotecas'
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
      text: 'Features avanzadas',
      collapsible: true,
      items: [
        {
          text: 'Visual Studio Code',
          link: '/guia/avanzado/code'
        },
        {
          text: 'Agregar Unit Testing',
          link: '/guia/avanzado/tests'
        },
        {
          text: 'Configurar el compilador',
          link: '/guia/avanzado/gcc'
        },
        // {
        //   text: 'Shared Libraries',
        //   link: '/guia/avanzado/shared-libraries'
        // },
        {
          text: 'Escuchar cambios en el código',
          link: '/guia/avanzado/escuchar-cambios'
        },
      ],
    },
  ],
};

export type NavItem =
  { text: string; link: string; } |
  { text: string; items: NavItem[]; };

export const navbar = [
  {
    text: 'Guía',
    link: '/guia/',
    items: [
      {
        text: 'Guía inicial',
        items: [
          '/guia/primeros-pasos',
          '/guia/multiples-archivos',
          '/guia/args',
          '/guia/static-libraries',
          '/guia/valgrind',
          '/guia/deploy',
        ]
      },
      {
        text: 'Eclipse',
        items: [
          '/guia/eclipse/project',
          '/guia/eclipse/static',
        ]
      },
      {
        text: 'Visual Studio Code',
        items: [
          '/guia/code/project',
          '/guia/code/include',
          '/guia/code/static',
        ]
      },
      {
        text: 'Features avanzadas',
        items: [
          '/guia/shared-libraries',
          '/guia/avanzado/escuchar-cambios',
          '/guia/avanzado/tests',
          '/guia/avanzado/gcc',
        ],
      },
    ]
  },
  {
    text: 'Comandos',
    link: '/comandos/',
  },
];

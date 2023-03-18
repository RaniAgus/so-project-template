import MarkdownItFootnotePlugin from 'markdown-it-footnote';
import { defineConfig } from 'vitepress';
import { description, repository } from '../../package.json';
import { sidebar } from './configs/sidebar';
import { navbar } from './configs/navbar';

export default defineConfig({
  lang: 'es-AR',
  title: 'Templates | Sistemas Operativos - UTN FRBA',
  description: description,
  base: '/so-project-template/',
  lastUpdated: true,
  cleanUrls: true,
  titleTemplate: 'Sistemas Operativos - UTN FRBA',
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['link', { rel: 'icon', href: '/img/logo.png' }],
  ],
  themeConfig: {
    siteTitle: 'SisOp Templates',
    logo: '/img/logo.png',
    outline: 'deep',
    outlineTitle: 'En esta página',
    lastUpdatedText: 'Última actualización',
    nav: navbar,
    sidebar: sidebar,
    socialLinks: [
      {
        icon: 'github',
        link: `${repository}/issues?q=is%3Aissue+label%3Aquestion`
      },
    ],
    editLink: {
      pattern: `${repository}/edit/main/src/:path`,
      text: 'Editar esta página en GitHub',
    },
    docFooter: {
      prev: 'Página anterior',
      next: 'Página siguiente',
    },
  },
  markdown: {
    config: (md) => {
      md.use(MarkdownItFootnotePlugin);
    },
  },
});

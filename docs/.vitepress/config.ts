import { defineConfig } from 'vitepress';
import { description, repository } from '../../package.json';
import { sidebar } from './configs/sidebar';
import { navbar } from './configs/navbar';

export default defineConfig({
  title: 'SisOp Templates',
  description: description,
  base: '/so-project-template-guide/',
  lastUpdated: true,
  cleanUrls: 'without-subfolders',
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['link', { rel: 'icon', href: '/img/logo.png' }],
  ],
  themeConfig: {
    siteTitle: 'SisOp Templates',
    logo: '/img/logo.png',
    nav: navbar,
    sidebar: sidebar,
    socialLinks: [
      {
        icon: 'github',
        link: `${repository}/issues?q=is%3Aissue+label%3Aquestion`
      },
    ],
    // editLink: {
    //   pattern: `${repository}-guide/edit/main/src/:path`,
    //   text: 'Editar esta página en GitHub',
    // },
  },
});

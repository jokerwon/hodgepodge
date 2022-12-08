import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/',
  title: '@jokerwon',
  lang: 'zh-CN',
  themeConfig: {
    logo: '/logo.png',
    lastUpdatedText: '最后修改时间',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jokerwon/monorepo-template' },
    ],
    nav: [{ text: '指南', link: '/docs/guide/' }],
    // 侧边栏
    sidebar: {
      '/docs/guide/': [
        {
          text: '指南',
          items: [
            {
              text: '快速开始',
              link: '/docs/guide/',
            },
          ],
        },
        {
          text: 'utils',
          items: [
            {
              text: 'omit',
              link: '/utils/omit/',
            },
          ],
        },
      ],
      '/utils/': [
        {
          text: 'utils',
          items: [
            {
              text: 'omit',
              link: '/utils/omit/',
            },
          ],
        },
      ],
    },
  },
});

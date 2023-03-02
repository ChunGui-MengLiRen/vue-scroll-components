const config = {
  base: "/vue-scroll-components/",
  title: "vue-scroll-components",
  description: "vue滚动组件",
  themeConfig: {
    siteTitle: "vue-scroll-components",
    nav: [
      { text: "指南", link: "/guide/" },
      { text: "更新日志", link: "/logs/" },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/ChunGui-MengLiRen/vue-scroll-components.git",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "安装", link: "/guide/" },
            { text: "使用", link: "/guide/使用" },
            { text: "配置", link: "/guide/配置" },
            { text: "事件", link: "/guide/事件" },
            { text: "方法", link: "/guide/方法" },
            { text: "注意事项", link: "/guide/注意事项" },
          ],
        },
        {
          text: "示例",
          items: [
            { text: "01 - 默认配置", link: "/guide/01-默认配置" },
            { text: "02 - 上下滚动", link: "/guide/02-上下滚动" },
            { text: "03 - 左右滚动", link: "/guide/03-左右滚动" },
            { text: "04 - 滚动控制", link: "/guide/04-滚动控制" },
            { text: "05 - 单步停顿", link: "/guide/05-单步停顿" },
            { text: "06 - 手动控制", link: "/guide/06-手动控制" },
            { text: "07 - 自定义控制", link: "/guide/07-自定义控制" },
            { text: "08 - 数据更新", link: "/guide/08-数据更新" },
          ],
        },
      ],
    },
    footer: {
      message: "欢迎给出一些意见和优化，期待你的 Pull Request.",
      copyright: "如有建议和疑问请前往issues.",
    },
  },
};

export default config;

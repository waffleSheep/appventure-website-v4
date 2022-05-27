const path = require('path');

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/styles/base/_variables.scss'),
        // you can also use a glob if you'd prefer
        //path.resolve(__dirname, './src/assets/styles/**/*.scss'),
      ],
    });
}

module.exports = {
  siteName: 'AppVenture',
  icon: 'src/assets/favicon.png',
  plugins: [
    { use: 'gridsome-plugin-typescript' },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'BlogPost',
        path: 'content/blog/**/*.md',
        refs: {
          author: 'Contributor',
          tags: 'Tag',
        },
        remark: {
          plugins: [['@gridsome/remark-prismjs', {transformInlineCode: true}],'gridsome-remark-katex'],
        },
      },
    },

    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Event',
        path: 'content/events/**/*.yaml',
        refs: {
          tags: 'Tag',
        },
      },
    },

    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Project',
        path: 'content/projects/**/*.yaml',
        refs: {
          tags: 'Tag',
          allContributors: 'Contributor',
        },
      },
    },

  ],
  templates: {
    BlogPost: '/blog/:year/:month/:day/:slug',
    Contributor: '/contributor/:id',
    Event: '/events/:id',
    Project: '/projects/:id',
  },
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];

    // or if you use scss
    types.forEach((type) => {
      addStyleResource(config.module.rule('scss').oneOf(type));
    });
  },
};

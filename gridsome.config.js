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
        path: 'blog/**/*.md',
        refs: {
          author: 'Contributor',
        },
        remark: {
          plugins: [['@gridsome/remark-prismjs', {transformInlineCode: true}]]
        }
      },
    },
  ],
  templates: {
    BlogPost: '/blog/:year/:month/:day/:slug',
    Contributor: '/contributor/:id',
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

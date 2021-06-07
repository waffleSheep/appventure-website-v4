const path = require('path')
const fs = require('fs-extra')
const yaml = require('js-yaml')

module.exports = function (api) {
  api.loadSource(async (store) => {
      const authorsPath = path.join(__dirname, 'contributors/contributors.yaml');
      const authorsRaw = await fs.readFile(authorsPath, 'utf8');
      const authorsJson = yaml.load(authorsRaw);
      const authors = store.addCollection('Contributor');

      authorsJson.forEach(({id, name:title,...fields }) => {
        authors.addNode({
          id,
          title,
          internal: {
            origin:authorsPath
          },
          ...fields
        });
      });

    }
  );
};

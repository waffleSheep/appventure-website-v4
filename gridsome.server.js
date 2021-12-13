const path = require('path')
const fs = require('fs-extra')
const yaml = require('js-yaml')

module.exports = function (api) {
  api.loadSource(async (store) => {
    // projects
    store.addSchemaTypes(`
      type Contribution {
        contributors: [Contributor] @reference(by: "id")
        year: Int
      }

      type Project implements Node @infer {
        created: Contribution
        maintained: [Contribution]
      }
    `)

    // contributors
    const authorsPath = path.join(__dirname, 'content/contributors/contributors.yaml');
    const authorsRaw = await fs.readFile(authorsPath, 'utf8');
    const authorsJson = yaml.load(authorsRaw);
    const authors = store.addCollection('Contributor');


    authorsJson.forEach(({id,avatar,...fields }) => {
      avatar = (!avatar) ? `https://source.boringavatars.com/pixel/120/${id}?colors=009A90,333F48,41B883` : avatar;
      authors.addNode({
        id,
        avatar,
        internal: {
          origin:authorsPath
        },
        ...fields
      });
    });

    // tagging
    const tagsPath = path.join(__dirname, 'content/tags/tags.yaml');
    const tagsRaw = await fs.readFile(tagsPath, 'utf8');
    const tagsJson = yaml.load(tagsRaw);
    const tags = store.addCollection('Tag');

    tagsJson.forEach(({id,...fields}) => {
      tags.addNode({
        id,
        ...fields
      });
    });
  });
};

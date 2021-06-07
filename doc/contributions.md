
# Contributions Guide

## Contributor profile

Contributor entries may be added as such:

`contributors.yaml`
```yaml
...
- id: hjvedvik
  name: Hans-Jørgen Vedvik
  bio: Co-creator of @gridsome. Developer lead.
  quote: one fish, two fish, red fish, blue fish
  avatar: ./images/hjvedvik.png # otherwise use ./images/default_avatar.svg
...
```

1. For one's avatar, PNGs are preferred as there may be issues with JPGs/JPEGs and mozjpeg at least for development. SVGs work too.

## Blog posts

Folder names are arbitrary, but it is best to follow `YYYY-MM-DD-article-slug`. Below is an example of the metadata that should be included in the markdown file of the article.

`index.md`
```markdown
title: Say hello to Gridsome 👶🎉💚
slug: say-hello-to-gridsome
author: [hjvedvik]
date: 2018-10-10
excerpt: "A new static site generator baby is born. It's highly inspired by Gatsby.js (React based) but built on top of Vue.js. We have been working on it for a year and will have a beta ready soon. You can expect this baby to grow up fast!"
```

1. Markdown files are parsed with a [Gridsome plugin](https://gridsome.org/plugins/@gridsome/transformer-remark) for [remark.js](https://remark.js.org/). Though files should end up relatively sanitized, avoid anything silly. Currently, vue components can't be interfaced within markdown.
2. Image links may be included with a relative filepath as such: `![My image][./image.png]`. `/image.png` will not work.

## Tagging


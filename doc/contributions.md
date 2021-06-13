
# Contributions Guide

## Contributor profile

Sample contributor entry:

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


Sample markdown file preamble:

`index.md`
```markdown
title: Say hello to Gridsome 👶🎉💚
slug: say-hello-to-gridsome
author: [hjvedvik]
date: 2018-10-10
excerpt: "A new static site generator baby is born. It's highly inspired by Gatsby.js (React based) but built on top of Vue.js. We have been working on it for a year and will have a beta ready soon. You can expect this baby to grow up fast!"
tags: [ctf,eso,toc]
```

1. Markdown files are parsed with a [Gridsome plugin](https://gridsome.org/plugins/@gridsome/transformer-remark) for [remark.js](https://remark.js.org/). Though files should end up relatively sanitized, avoid anything silly. Currently, vue components can't be interfaced within markdown.
2. Image links may be included with a relative filepath as such: `![My image][./image.png]`. `/image.png` will not work.
3. Folder names are arbitrary, but it is best to follow `YYYY-MM-DD-article-slug`.

## Tagging

Markdown files may be tagged by including an array of tag ids into the preamble. The list of tags and their ids can be found in content/tags.yaml

Sample tag entry:

`tags.yaml`
```yaml
- id: ml
  name: machine learning
  description: Subset of AI to engineer systems to learn from data, spot patterns and make decisions with minimal human interaction.
  category: cs
```

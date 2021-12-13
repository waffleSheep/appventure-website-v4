# Documentation

## Some Gotchas

1. When linking images, use PNGs or SVGs, JPEGs and BMPs don't work sometimes.
1. Link images with a relative filepath with a dot as such: `![My image][./image.png]`. 

## Contributor profile

Sample contributor entry:

`content/contributors/contributors.yaml`
```yaml
...
- id: johndoe
  name: John Doe
  bio: A little bit about yourself
  quote: one fish, two fish, red fish, blue fish
  avatar: ./images/johndoe.png # will be replaced with boringavatars.com if unspecified
...
```

## Blog posts

Sample markdown file preamble:

`index.md`
```yaml
title: Say hello to Gridsome 👶🎉💚
slug: 2014-01-01-say-hello-to-gridsome
author: [hjvedvik]
date: 2018-10-10
excerpt: "A new static site generator baby is born. It's highly inspired by Gatsby.js (React based) but built on top of Vue.js. We have been working on it for a year and will have a beta ready soon. You can expect this baby to grow up fast!"
tags: [ctf,eso,toc]
```

## Tagging

Markdown files may be tagged by including an array of tag ids into the frontmatter. The list of existing tags and their ids can be found in ```content/tags/tags.yaml```.

Sample tag entry:

`content/tags/tags.yaml`
```yaml
- id: android
  name: Android
  description: Mobile apps designed for Android devices
  category: cs
```

## Projects

Sample Project entry:

`content/projects/myProject/project.yaml`
```yaml
id: exam-display
name: Exam Display
description: A display for use during tests and exams. Includes a clock, exam information, and tracker for the number of students outside.
type: "/AppVenture/Community"
created:
  contributors: [leongys]
maintained:
  - contributors: [zhaoyun]
    year: 2021
tags: [desktop]
gallery:
  - ./exam-display-1.jpeg
```

- ```id```: Project name in lower snake-case.
- ```name```: Project name
- ```description```: Full description of the project
- ```type:```: Context of project. Can be ```/Module/Year N```, ```/Competition/...```, or ```/Appventure/...```. (To be defined).
- created: 
  - ```contributors```: Contributors who initiated the project.
- maintained: Entries consist of a list of contributors and the year they were active.
- tags: Tags for the project. Refer to ```content/tags.yaml```
- gallery: List of images to be presented on carousel.

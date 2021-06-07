<template>
  <div class="medium-container blog-card">
    <g-link
      class="link"
      :to="blogPost.path"
    />
    <div class="info">
      <h3 class="title">
        {{ blogPost.title }}
      </h3>
      <p class="excerpt">
        {{ blogPost.excerpt }}
      </p>
    </div>
    <div class="metainfo">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';

interface BlogPost {
  author: {title: string; path: string; avatar: string};
  date: string;
  title: string;
  content: string;
  excerpt: string;
  path: string;
}

@Component
export default class BlogCard extends Vue {
  @Prop() blogPost!: BlogPost;
}
</script>

<style lang="scss" scoped>

div.blog-card {
  position: relative;
  height: 250px;
  background-color: $background;
  padding: 0;
  border-radius: 1rem;
  box-shadow: 0 5px 9px 1px #EFEFEF;
  display: flex;
  flex-flow: row;

  transition: box-shadow .3s, transform .3s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 14px 4px #EFEFEF;
  }

  .info {
    padding: 2rem;
    overflow: hidden;
  }

  .link {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

</style>

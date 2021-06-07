<template>
  <p class="blog-meta">
    <small>
      <template v-if="post.author">
        Posted {{ post.date }} by
        <template v-for="(author, i) in post.author">
          <span v-if="i && i === post.author.length - 1"> , </span>
          <span v-else-if="i > 0">, </span>
          <g-link class="author-link" :to="author.path">
              <g-image class="author-avatar" :alt="author.title" :src="author.avatar"/>
          </g-link>
          <g-link class="author-link" :to="author.path">{{ author.title }}</g-link>
        </template>
      </template>
    </small>
  </p>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class BlogMeta extends Vue {
  @Prop() post!: object;
}
</script>

<style lang="scss">
.author-avatar {
  width: 30px;
  border-radius: 99px;
  vertical-align: middle;
  margin: 0 6px;

  border: solid 3px transparent;
  transition: border-width 0.1s;
  &:hover {
    border-width: 0;
  }
}
.author-link {
  z-index: 1;
  position: relative;
}
.blog-meta {
  margin-bottom: 0;
}
</style>

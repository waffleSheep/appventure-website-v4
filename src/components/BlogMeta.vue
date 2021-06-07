<template>
  <p class="blog-meta">
    <small>
      <template v-if="post.author">
        Posted {{ post.date }} by
        <template v-for="(author, i) in post.author">
          <span v-if="i && i === post.author.length - 1"> and </span>
          <span v-else-if="i > 0">, </span>
          <g-link class="author-link" :to="author.path" :key="author.id">
            <template v-if="author.avatar">
              <g-image class="author-image" :alt="author.title" :src="author.avatar" />
            </template>
            <template v-else>
              <g-image class="author-image" :alt="author.title" src="@/assets/images/contributor_avatar_default.svg" />
            </template>
          </g-link>
          <g-link class="author-link" :to="author.path" :key="author.id">{{ author.title }}</g-link>
        </template>
      </template>
      <template v-else>
        uh oh
      </template>
    </small>
  </p>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
@Component
export default class BlogMeta extends Vue {
  @Prop() post!: object;
}
</script>

<style>
.author-image {
  width: 30px;
  border-radius: 99px;
  vertical-align: middle;
  margin: 0 6px;
}
.author-link {
  z-index: 1;
  position: relative;
}
.blog-meta {
  margin-bottom: 0;
}
</style>

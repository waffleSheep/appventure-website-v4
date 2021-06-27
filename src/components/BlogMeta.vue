<template>
  <p class="blog-meta">
    <small>
      <template v-if="post.author">
        Posted {{ post.date }} by
        <template v-for="(author, i) in post.author">
          <span v-if="i && i === post.author.length - 1"> , </span>
          <span v-else-if="i > 0">, </span>
          <ContributorTag :contributor="author"/>
        </template>
      </template>
    </small>
  </p>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import ContributorTag from './ContributorTag.vue';
@Component({
  components: { ContributorTag },
})
export default class BlogMeta extends Vue {
  @Prop() post!: object;
}
</script>

<style lang="scss">
.blog-meta {
  margin-bottom: 0;
}
</style>

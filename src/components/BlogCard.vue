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
      <BlogMeta :post="blogPost"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import BlogMeta from './BlogMeta.vue';
@Component({
  components: { BlogMeta },
})

export default class BlogCard extends Vue {
  @Prop() blogPost!: object;
}
</script>

<style lang="scss" scoped>

div.blog-card {
  position: relative;
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
    padding: 3rem;
    overflow: hidden;
  }

  .link {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .title {
    margin-top: 0;
    margin-bottom: 1rem;
  }
}

</style>

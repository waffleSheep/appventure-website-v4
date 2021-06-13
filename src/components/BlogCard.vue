<template>
  <div class="medium-container blog-card">
    <g-link
      class="link"
      :to="blogPost.path"
    />
    <div class="info">
      <g-image v-if="blogPost.poster" class="blog-poster" :src="blogPost.poster"/>
      <h3 class="title">
        {{ blogPost.title }}
      </h3>
      <p class="excerpt">
        {{ blogPost.excerpt }}
      </p>
      <BlogMeta :post="blogPost"/>
      <div class="tags">
        <TagChip class="tagChip"
                 v-for="tag in sortedTags"
                 :key="tag.id"
                 @tagClicked="(u) => $emit('tagClicked',u)"
                 :tag="tag"
                 :link-enabled="tagLinkEnabled">
        </TagChip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import BlogMeta from './BlogMeta.vue';
import TagChip from './TagChip.vue';
@Component({
  components: { BlogMeta,TagChip },
})
export default class BlogCard extends Vue {
  @Prop() blogPost!: object;
  @Prop({default: true}) tagLinkEnabled!: boolean

  get sortedTags() : Array<object> {
    // @ts-ignore
    return this.blogPost.tags.sort((u: object,v: object) => v.category.localeCompare(u.category));
  }
}
</script>

<style lang="scss" scoped>

div.blog-card {
  position: relative;
  background-color: $primary-color;
  color: white;
  padding: 0;
  border-radius: 1rem;
  box-shadow: 0 5px 9px 2px rgba(177, 184, 183, 0.93);
  display: flex;
  flex-flow: row;

  transition: box-shadow .3s, transform .3s;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 23px 4px rgba(177, 184, 183, 0.93);
  }

  .info {
    padding: 3rem 3rem 2rem;
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
    color: white;
  }
  .blog-poster {
    border-radius: 20px;
    width: 100%;
    margin-bottom: 2rem;
  }
  .tags {
    margin-top: 1rem;
  }
}
::v-deep a {
  color: white;
}


</style>

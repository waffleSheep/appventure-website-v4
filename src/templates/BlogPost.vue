<template>
  <Layout>
    <main class="blog-post">
      <div class="blog-header">
        <g-image
          class="blog-poster"
          poster
          v-if="$page.post.poster"
          quality="1"
          :src="$page.post.poster"
        />
        <h1 class="text-center">
          {{ $page.post.title }}
        </h1>
        <BlogMeta
          class="text-center"
          :post="$page.post"
        />
        <div class="tagChips flex-row justify-center">
          <TagChip
            class="tagChip"
            v-for="tag in sortedTags"
            :key="tag.id"
            :tag="tag"
            :filled="false"
            :link-enabled="true"
            :router-link="{ path: '/blog', query: {search: tag.id} }"
          />
        </div>
      </div>
      <hr class="title-rule">
      <div class="blog-body">
        <div
          class="content"
          v-html="$page.post.content"
        />
        <div>
          <img
            class="end-mark text-center"
            src="@/assets/images/appventure_logo_nobg.svg"
            alt="end-mark"
          >
        </div>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query ($id: ID!){
  post: blogPost (id: $id) {
    title
    date (format: "D. MMMM YYYY")
    author {
      name
      path
      avatar (width: 60)
    }
    tags {
      id
      name
      category
    }
    content
    excerpt
  }
}
</page-query>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import BlogMeta from '../components/BlogMeta';
import TagChip from '../components/TagChip.vue';
import { Tag } from '../types/Tag';

@Component({
  components: { BlogMeta, TagChip },
})
export default class BlogPost extends Vue {
	public metaInfo() {
		return {
			// @ts-ignore
			title: 'Blog: ' + this.$page.post.title,
		}
	}

  get sortedTags(): Tag[] {
    // @ts-ignore
    return this.$page.post.tags.sort((u: Tag,v: Tag) => v.category.localeCompare(u.category));
  }
}
</script>

<style scoped lang="scss">
.content {
  max-width: 100%;
  &::v-deep img {
    //margin-left: -10%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;

  }
}
.blog-poster{
  margin-left: -20%;
  max-width: 140%;
}
.layout main {
  padding-bottom: 0;
}
.end-mark {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3em;
  width: 2.5em;
}

.title-rule {
  margin: 1rem 0;
}

.blog-header {
  .tagChips {
    margin-top: 1rem;
  }
}


</style>

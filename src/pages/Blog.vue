<template>
  <Layout>
    <main class="blog">
      <div class="blog-list">
        <BlogCard
          class="blog-entries"
          v-for="edge in $page.posts.edges"
          :key="edge.node.id"
          :blog-post="edge.node"
        />
      </div>
    </main>
  </Layout>
</template>

<page-query>
query {
  posts: allBlogPost {
    edges {
      node {
        id
        title
        path
        date (format: "D. MMMM YYYY")
        excerpt
        content
      }
    }
  }
}
</page-query>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlogCard from '../components/BlogCard.vue';

@Component({
  components: {
    BlogCard,
  },
})

export default class BlogPage extends Vue {}
</script>

<style scoped lang="scss">
.blog-entries {
  margin: 4rem 0;
}
</style>

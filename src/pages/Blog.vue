<template>
  <Layout>
    <main class="blog">
      <div class="blog-list">
        <h1 class="text-center">Blog posts</h1>
        <p class="lede text-center">Featuring articles written by students from NUS High</p>
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
        poster
        content
        author {
          title
          path
          avatar (width: 30)
        }
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
  margin: 0 0 2rem;
}
</style>

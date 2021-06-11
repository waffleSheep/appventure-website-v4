<template>
  <Layout>
    <main class="blog">
      <div class="blog-list">
        <h1 class="text-center">Blog posts</h1>
        <p class="lede text-center">Featuring articles written by students from NUS High</p>
        <transition-group name="fade">
          <BlogCard
            class="blog-entries"
            v-for="{ node } of loadedPosts"
            :key="node.id"
            :blog-post="node"
          />
        </transition-group>
        <ClientOnly>
          <infinite-loading @infinite="infiniteHandler" spinner="spiral">
            <div slot="no-more"/>
            <div slot="no-results"/>
          </infinite-loading>
        </ClientOnly>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query BlogPage($page: Int){
  posts: allBlogPost(perPage: 10,page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
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
        tags {
          name
          category
        }
      }
    }
  }
}
</page-query>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlogCard from '../components/BlogCard.vue';
import { StateChanger } from 'vue-infinite-loading';

@Component({
  components: {
    BlogCard,
  },
})

export default class BlogPage extends Vue {
  loadedPosts: Array<object> = [];
  currentPage: number = 1;

  created() {
    // @ts-ignore
    this.loadedPosts.push(...this.$page.posts.edges);
  }

  async infiniteHandler($state: StateChanger) : Promise<void> {
    // @ts-ignore
    if (this.currentPage + 1 > this.$page.posts.pageInfo.totalPages) {
      $state.complete()
    } else {
      // @ts-ignore
      const { data } = await $fetch(
        `/blog/${this.currentPage + 1}`
      )
      if (data.posts.edges.length) {
        this.currentPage = data.posts.pageInfo.currentPage
        this.loadedPosts.push(...data.posts.edges)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  }
}

</script>

<style scoped lang="scss">

.blog-entries {
  margin: 0 0 2rem;
}
</style>

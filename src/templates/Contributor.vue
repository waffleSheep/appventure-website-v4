<template>
  <Layout>
    <main class="contributor">
      <div class="contributor-info text-center medium-container">
        <g-image class="author-avatar" :alt="$page.contributor.title" :src="$page.contributor.avatar"/>
        <h1>{{$page.contributor.title}}</h1>
        <p class="lede" v-if="$page.contributor.bio">
          {{$page.contributor.bio}}
        </p>
      </div>
      <div class="blog-list">
        <h3 class="text-center">Blog posts</h3>
        <BlogCard
          class="blog-entries"
          v-for="edge in $page.contributor.posts.edges"
          :key="edge.node.id"
          :blog-post="edge.node"
        />
      </div>
    </main>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  contributor (id: $id) {
    id
    title
    bio
    avatar (width: 124)
    posts:belongsTo(filter: {typeName: {eq: BlogPost}}) {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ...on BlogPost {
            id
            title
            path
            date (format: "D. MMMM YYYY")
            timeToRead
            author {
              id
              title
              path
              avatar (width: 30)
            }
            excerpt
            content
          }
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

export default class Contributor extends Vue {}
</script>

<style scoped>
.author-avatar {
  width: 124px;
  border-radius: 99px;
  vertical-align: middle;
  margin: 0 6px;
}
.bio {
  font-size: 1.2rem;
}
.blog-entries {
  margin: 0 0 2rem;
}
.contributor-info {
  margin-bottom: 4rem;
}
</style>

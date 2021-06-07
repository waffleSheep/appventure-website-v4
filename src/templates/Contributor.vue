<template>
  <Layout>
    <main class="contributor">
      <div class="contributor-info text-center medium-container">
        <g-image class="author-avatar" :alt="$page.contributor.title" :src="$page.contributor.avatar"/>
        <h1 class="contributor-title">{{$page.contributor.title}}</h1>
        <h4 class="lede quote" v-if="$page.contributor.quote">
          <q>{{$page.contributor.quote}}</q>
        </h4>
        <p v-if="$page.contributor.bio" class="bio">{{ $page.contributor.bio }}</p>
      </div>
      <hr/>
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
    quote
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

<style scoped lang="scss">
.contributor-info {
  margin-bottom: 4rem;
  .author-avatar {
    width: 184px;
    border-radius: 200px;
    vertical-align: middle;
    margin: 0 6px;
  }
  .contributor-title {
    margin: 2rem auto;
  }
  .quote {
    font-size: 1.3rem;
    font-style: italic;
    //&:before {
    //  content: '"';
    //  font-size: large;
    //}
    //&:after {
    //  content: '"';
    //  font-size: large;
    //}
  }
  .bio {
    padding: 0 4rem 0;
  }
}
.blog-entries {
  margin: 0 0 2rem;
}

</style>

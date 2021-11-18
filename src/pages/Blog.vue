<template>
  <Layout>
    <main class="blog">
      <div class="blog-list">
        <div class="preamble medium-container">
          <h1 class="text-center">
            Blog posts
          </h1>
          <p class="lede text-center">
            Featuring student-written articles on programming and internal events
          </p>
        </div>
        <hr>
        <transition-group name="fade">
          <BlogCard
            class="blog-entries"
            v-for="post in filteredPosts"
            :key="post.id"
            :blog-post="post"
          />
        </transition-group>
        <ClientOnly>
          <infinite-loading
            @infinite="infiniteHandler"
            spinner="spiral"
          >
            <div slot="no-more" />
            <div slot="no-results" />
          </infinite-loading>
        </ClientOnly>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query BlogPage($page: Int) {
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
        author {
          id
          name
          path
          avatar (width: 30)
        }
        tags (sortBy: "category", order: ASC) {
          id
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
import BlogCard from '@/components/BlogCard.vue';
import { StateChanger } from 'vue-infinite-loading';
import { BlogPost } from '../types/BlogPost';

@Component({
  components: {
    BlogCard,
  },
})

export default class BlogPage extends Vue {
  private loadedPosts: BlogPost[] = [];
  currentPage: number = 1;

  get filteredPosts() {
    return this.loadedPosts.filter((post) => this.filterPost(post));
  }

  created() {
    // @ts-ignore
    this.loadedPosts = this.$page.posts.edges.map((n) => n.node);
  }

  filterPost(blogPost: BlogPost): boolean {
    return true;
  }

  async infiniteHandler($state: StateChanger): Promise<void> {
    // @ts-ignore
    if (this.currentPage + 1 > this.$page.posts.pageInfo.totalPages) {
      $state.complete();
    } else {
      // @ts-ignore
      const { data } = await $fetch(
        `/blog/${this.currentPage + 1}`
      );
      if (data.posts.edges.length) {
        this.currentPage = data.posts.pageInfo.currentPage;
        this.loadedPosts.push(...data.posts.edges);
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  }
}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"/>
<style scoped lang="scss">

.blog-entries {
  margin: 0 0 2rem;
}
hr {
  margin: 2rem 0;
}
.search-bar {
  max-height: inherit;
  font-family: $font-family;
  width: 105%;
  margin-left: -2%;
  margin-bottom: 2rem;

  &::v-deep {
    .multiselect__input {
      border: none;
      box-shadow: none;
    }
    .multiselect__tag {
      //background: $secondary-color;
      font-weight: bold;
    }
  //  .multiselect__option--highlight {
  //    background: $secondary-color;
  //  }
  //  .multiselect__option--highlight:after {
  //    background: $secondary-color;
  //  }
  //  .multiselect__spinner:after, .multiselect__spinner:before{
  //    background: $secondary-color;
  //  }
  }
}


</style>

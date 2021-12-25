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

          <div class="filter-box">
            <input
              class="search-bar"
              placeholder="Search posts..."
              v-model="searchValue"
            >
            <p>{{ searchIndicator }}</p>
          </div>
        </div>

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
          description
          category
        }
      }
    }
  }
}
</page-query>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BlogCard from '@/components/BlogCard.vue';
import { StateChanger } from 'vue-infinite-loading';
import { BlogPost } from '../types/BlogPost';
import Fuse from 'fuse.js';

import { debounce } from 'lodash';

@Component({
  components: {
    BlogCard,
  },
})

export default class BlogPage extends Vue {
  loadedPosts: BlogPost[] = [];
  currentPage: number = 1;

  searchValue: string = "";
  searchValueIsDirty: boolean = false;
  isCalculating: boolean = false;

  searcher: Fuse<BlogPost> | undefined;
  filteredPosts: BlogPost[] = [];
  filterPosts: CallableFunction = () => {}; // need to assign in created

	public metaInfo() {
		return {
			title: 'Blog',
		}
	}

  get searchIndicator(): string {
    if (this.isCalculating) {
      return '⟳ Searching';
    } else if (this.searchValueIsDirty) {
      return '... Typing';
    } else {
      return `✓ ${this.filteredPosts.length} result(s) found`;
    }
  }

  updateSearcher() {
    this.searcher = new Fuse<BlogPost>(this.loadedPosts, {
      threshold: 0.2,
      keys: ['name', 'author.name', 'tags.name'],
    });
    this.isCalculating = true;
    this.filterPosts  = debounce(() => {
      if (!this.searcher) return;
      this.isCalculating = true;
      this.filteredPosts = this.searchValue.length
        ? this.searcher.search(this.searchValue).map((r) => r.item) 
        : this.loadedPosts;

      this.isCalculating = false;
      this.searchValueIsDirty = false;
    }, 100);
    this.filterPosts();
  }

  @Watch("searchValue")
  watchSearchValue() {
    this.searchValueIsDirty = true;
    this.filterPosts();
  }

  created() {
    if (this.$route.query.search)
      this.searchValue = this.$route.query.search as string;
    // @ts-ignore
    this.loadedPosts = this.$page.posts.edges.map((n) => n.node);
    this.updateSearcher();
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

<style scoped lang="scss">
.blog {
  width: 100%;
}

.blog-entries {
  margin: 0 0 2rem;
}

.filter-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.search-bar {
  font-family: $font-family;
  text-align: center;

  width: 100%;
  padding: 8px 12px;
  border: 2px solid $primary-color;
  border-radius: 32px;

  margin-bottom: 8px;
}
</style>

<template>
  <div>
  <transition-group name="fade">
    <BlogCard v-if="contributionType===Contribution.BLOGPOST"
      class="entries"
      v-for="post of filteredEntries"
      :key="post.id"
      :blog-post="post"
      :tag-link-enabled="false"
    />
  </transition-group>
  <ClientOnly>
    <infinite-loading @infinite="infiniteHandler" spinner="spiral">
      <div slot="no-more"/>
      <div slot="no-results"/>
    </infinite-loading>
  </ClientOnly>
  </div>
</template>

<static-query>
query ($page: Int){
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
#        poster
        content
        author {
          id
          name
          path
          avatar (width: 30)
        }
        tags {
          id
          name
          category
        }
      }
    }
  }
}
</static-query>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Contribution } from '../types/Contribution';
import { BlogPost } from '../types/BlogPost';
import { StateChanger } from 'vue-infinite-loading';
import BlogCard from './BlogCard.vue';

@Component({
  components: {
    BlogCard
  }
})
export default class BlogList extends Vue {
  @Prop() contributionType!: Contribution;
  @Prop() filterPost!: (arg0: any) => (boolean);
  @Prop() directory!: string;

  Contribution = Contribution;

  private loadedEntries: BlogPost[] = [];
  currentPage: number = 1;
  searchValue: object[] = [];
  options: object[] = [];

  get filteredEntries() {
    return this.loadedEntries.filter(post => this.filterPost(post));
  }

  created() {

    // @ts-ignore
    this.loadedEntries.push(...this.$static.posts.edges.map(n => n.node));

  }

  async infiniteHandler($state: StateChanger) : Promise<void> {
    // @ts-ignore
    if (this.currentPage + 1 > this.$page.posts.pageInfo.totalPages) {
      $state.complete();
    } else {
      // @ts-ignore
      const { data } = await $fetch(
        `${this.directory}/${this.currentPage + 1}`
      )
      if (data.posts.edges.length) {
        this.currentPage = data.posts.pageInfo.currentPage;
        this.loadedEntries.push(...data.posts.edges);
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.entries {
  margin: 0 0 2rem;
}
</style>

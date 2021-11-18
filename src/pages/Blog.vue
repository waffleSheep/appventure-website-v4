<template>
  <Layout>
    <main class="blog">
      <div class="blog-list">
        <div class="preamble medium-container">
        <h1 class="text-center">Blog posts</h1>
        <p class="lede text-center">Featuring student-written articles on programming and internal events</p>
        <multiselect class="search-bar"
                     v-model="searchValue"
                     placeholder="Add search filter"
                     label="name"
                     track-by="id"
                     :closeOnSelect="false"
                     :options="options"
                     :multiple="true"
                     :taggable="true"
                     :maxHeight="200"
                     group-label="type"
                     group-values="entries"
                     @tag="addTag"
        />
        </div>
        <hr/>
        <transition-group name="fade">
          <BlogCard
            class="blog-entries"
            v-for="post of filteredPosts"
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
    </main>
  </Layout>
</template>

<page-query>
query BlogPage($page: Int){
  tags: allTag(sortBy: "name", order: DESC) {
    edges {
      node {
        id
        name
      }
    }
  }
  authors: allContributor(sortBy: "name",order: DESC) {
    edges {
      node {
        id
        name
      }
    }
  }
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
</page-query>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlogCard from '../components/BlogCard.vue';
import { StateChanger } from 'vue-infinite-loading';
import Multiselect from 'vue-multiselect';
import { BlogPost } from '../types/BlogPost';
import { Tag } from '../types/Tag';
import { Contributor } from '../types/Contributor';

@Component({
  components: {
    BlogCard, Multiselect
  },
})

export default class BlogPage extends Vue {
  private loadedPosts: BlogPost[] = [];
  currentPage: number = 1;
  searchValue: object[] = [];
  options: object[] = [];

  get filteredPosts() {
    return this.loadedPosts.filter(post => this.filterPost(post));
  }

  addTag(tag: string) {
    const obj = {name: tag.trim(), id: tag.trim()};
    this.searchValue.push(obj);
  }

  pushTag(tagId: string){
    // @ts-ignore
    const res = this.$page.tags.edges.find((n: any) => n.node.id === tagId)
    if(res)
      this.searchValue.push(res.node);
  }

  created() {
    if(this.$route.query.id)
      this.pushTag(this.$route.query.id as string);

    // @ts-ignore
    this.loadedPosts.push(...this.$page.posts.edges.map(n => n.node));
    this.options = [
      {
        type: 'Common tags',
        // @ts-ignore
        entries: this.$page.tags.edges.map((u: any) => u.node),
      },
      {
        type: 'Authors',
        // @ts-ignore
        entries: this.$page.authors.edges.map((u: any) => u.node),
      }
    ];
  }

  filterPost(blogPost: BlogPost) : boolean {
    return this.searchValue.every((tag: any) =>{
      return blogPost.tags.find((o: Tag) => o.id === tag.id)
        || blogPost.author.find((o: Contributor) => o.id === tag.id)
        || blogPost.author.find((o: Contributor) => o.name.includes(tag.name))
        || blogPost.title.toLowerCase()
          .concat(" \t " + blogPost.excerpt.toLowerCase())
          .includes(tag.name.toLowerCase());
    });
  }

  async infiniteHandler($state: StateChanger) : Promise<void> {
    // @ts-ignore
    if (this.currentPage + 1 > this.$page.posts.pageInfo.totalPages) {
      $state.complete();
    } else {
      // @ts-ignore
      const { data } = await $fetch(
        `/blog/${this.currentPage + 1}`
      )
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

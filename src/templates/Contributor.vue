<template>
  <Layout>
    <main class="contributor">
      <div class="contributor-info text-center medium-container">
        <g-image class="author-avatar" :alt="$page.contributor.name" :src="$page.contributor.avatar"/>
        <h1 class="contributor-title">{{$page.contributor.name}}</h1>
        <h4 class="lede quote" v-if="$page.contributor.quote">
          <q>{{$page.contributor.quote}}</q>
        </h4>
        <p v-if="$page.contributor.bio" class="bio">{{ $page.contributor.bio }}</p>
      </div>
      <hr/>

        <div class="timeline">
          <div
            class="tab"
            v-for="type in ['Blog Posts', 'Project']"
            :key="type"
            @click="selectedType = type"
          >
            {{ type }}
          </div>
        </div>

      <div v-if="selectedType === 'Blog Posts'" class="blog-list">
        <h3 class="text-center">Blog posts</h3>
        <p class="empty-text text-center" v-if="$page.contributor.posts.edges.length === 0">
          None found
        </p>
        <transition-group name="fade">
        <BlogCard
          class="blog-entries"
          v-for="edge in $page.contributor.posts.edges"
          :key="edge.node.id"
          :blog-post="edge.node"
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
query ($id: ID!) {
  contributor (id: $id) {
    id
    name
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
              name
              path
              avatar (width: 30)
            }
            excerpt
            content
            tags {
              name
              category
            }
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
import { StateChanger } from 'vue-infinite-loading';
import { BlogPost } from '../types/BlogPost';

@Component({
  components: {
    BlogCard,
  },
})

export default class Contributor extends Vue {
  loadedPosts: BlogPost[] = [];
  currentPage: number = 1;
  selectedType = 'Blog Posts'

  created() {
    // @ts-ignore
    this.loadedPosts.push(...this.$page.contributor.posts.edges);
  }

  async infiniteHandler($state: StateChanger) : Promise<void> {
    // @ts-ignore
    if (this.currentPage + 1 > this.$page.contributor.posts.pageInfo.totalPages) {
      $state.complete()
    } else {
      // @ts-ignore
      const { data } = await this.$fetch(
        // @ts-ignore
        `/contributor/${this.$page.contributor.id}/${this.currentPage + 1}`
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
.blog-list {
  .empty-text {
    font-style: italic;
    font-weight: lighter;
  }
  .timeline {
    display: flex;
    justify-content: center;

    .tab {
      padding: .2rem .4rem;
      margin: 0 .4rem;
      border-radius: .4rem;

      &:hover {
        background-color: #eee;
        cursor: pointer;
      }

      &.selected {
        color: $primary-color;
        font-weight: bold;
      }
    }
  }
  .blog-entries {
    margin: 0 0 2rem;
  }
}

</style>

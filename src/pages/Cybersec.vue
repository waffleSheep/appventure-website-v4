<template>
  <Layout>
    <main>
      <div class="preamble medium-container">
        <h1 class="text-center">Cybersecurity Division</h1>
        <p class="lede text-center">From student-organized CTFs to articles on making software secure, here is a showcase of what we have to offer.</p>
      </div>
      <hr/>
      <div>
        <h2>CTFs</h2>
      <a href="https://ctf.nush.app"
              class="link">
        <div class="banner medium-container">
        <div class="info">
          <h3>Looking for a some CTF action? Join us at ctf.nush.app</h3>
          <h4>Current event: MiniCTF #15</h4>
          <a
            class="icon-button la la-history"
          />
          <a
            class="icon-button la la-question"
          />
        </div>
      </div>
      </a>
      </div>
      <hr/>
      <div>
        <h2>Blog posts</h2>
        <BlogCard
          class="blog-entries"
          v-for="post of cybersecBlogPosts"
          :key="post.id"
          :blog-post="post"
          :tag-link-enabled="false"
        />
      </div>
    </main>
  </Layout>
</template>

<page-query>
query CybersecPage {
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
import { BlogPost } from '../types/BlogPost';
import BlogCard from '../components/BlogCard.vue';
import Multiselect from 'vue-multiselect';

@Component({
  components: {
    BlogCard
  },
})
export default class CybersecPage extends Vue {
  get cybersecBlogPosts(): BlogPost[] {

    // @ts-ignore
    console.log(this.$page.posts.edges.map(it => it.node))
    // @ts-ignore
      return this.$page.posts.edges.map(it => it.node).filter(it => it.tags.map(it => it.category).includes('cybersec'));
  }
}
</script>

<style scoped lang="scss">

hr {
  margin: 2rem 0;
}

.link {
  text-decoration: none !important;
}

div.banner {
  border-radius: 1rem;
  background-color: $ctf;
  color: #fff;

  padding: 1rem 2rem;

  display: flex;
  flex-flow: row wrap;

  box-shadow: 0 5px 9px 2px rgba(177, 184, 183, 0.93);

  .info {
    flex: 1;
    h3,h4 { color: #fff; }
  }
}
a.icon-button {
  text-decoration: none;
  font-size: 2rem;

  border: .2rem solid #fff;
  border-radius: 50%;

  padding: .2rem;

  margin-right: .8rem;

  background-color: #fff;
  color: $ctf;
  transition: all ease-in-out .2s;

  &:hover {
    background-color: $ctf;
    color: #fff;
  }
}

</style>

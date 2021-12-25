<template>
  <Layout>
    <main>
      <div class="preamble medium-container">
        <h1 class="text-center">Cybersecurity Division</h1>
        <p class="lede text-center">From student-organized CTFs to articles on making software secure, here is a showcase of what we have to offer. </p>
        <p class="text-center">Psst... Join us at <a href="https://ctf.nush.app">ctf.nush.app</a> for seasonal challenges set by yours truly.</p>
      </div>
<!--      <hr/>-->
<!--      <div>-->
<!--        <h2 class="section-header">CTFs</h2>-->
<!--        <a href="https://ctf.nush.app" class="link">-->
<!--        <div class="banner medium-container">-->
<!--        <div class="info">-->
<!--          <h3>Looking for a some CTF action? Join us at ctf.nush.app</h3>-->
<!--          <h4>Current event: MiniCTF #15</h4>-->
<!--          <a-->
<!--            class="icon-button la la-link"-->
<!--            href="https://ctf.nush.app"-->
<!--          />-->
<!--          &lt;!&ndash; TODO: Getting current CTF to be automated &ndash;&gt;-->
<!--          <a-->
<!--            class="icon-button la la-file-alt"-->
<!--            href="http://localhost:8080/blog/2019/10/08/minictf000/"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
<!--      </a>-->
<!--      </div>-->
      <hr/>
      <div class="cybersec-section">
        <div
          class="tab"
          v-for="section in ['Write-ups','Blog']"
          :key="section"
          @click="selectedSection = section"
          :class="[ selectedSection === section ? 'selected' : '' ]"
        >
          {{ section }}
        </div>
      </div>

      <div v-if="selectedSection === 'Write-ups'" >
        <h2 class="section-header">Write-ups</h2>
        <BlogCard
          class="entries"
          v-for="post of cybersecWriteups"
          :key="post.id"
          :blog-post="post"
          :tag-link-enabled="false"
        />
      </div>
      <div v-else>
        <h2 class="section-header">Blog posts</h2>
        <BlogCard
          class="entries"
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
import { BlogPost } from '@/types/BlogPost';
import BlogCard from '@/components/BlogCard.vue';

@Component({
  components: {
    BlogCard
  },
})

export default class CybersecPage extends Vue {
  selectedSection = 'Write-ups';
  posts: BlogPost[] = [];

	public metaInfo() {
		return {
			title: 'Cybersec',
		}
	}

  created() {
    // @ts-ignore
    this.posts = this.$page.posts.edges.map((it) => it.node);
  }

  /* NOTE: Deep filtering is not available using GraphQL yet */
  get cybersecBlogPosts(): BlogPost[] {
    return this.posts
      .filter(it => it.tags.map(it => it.id).includes('ctf'))
      .filter(it => !it.tags.map(it => it.id).includes('writeup'));
  }

  get cybersecWriteups(): BlogPost[] {
    return this.posts
      .filter(it => it.tags.map(it => it.id).includes('ctf'))
      .filter(it => it.tags.map(it => it.id).includes('writeup'));
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
button.round-button {
  text-decoration: none;

  border: .2rem solid #fff;

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
.cybersec-section {
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
.entries {
  margin: 0 0 2rem;
}
.section-header {
  padding-left: 16px;
}

</style>

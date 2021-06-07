<template>
  <Layout>
    <main class="blog-post">
      <div>
        <h1 class="text-center">{{ $page.post.title }}</h1>
        <BlogMeta class=text-center :post="$page.post"/>
      </div>
      <div class="blog-body">
        <p class="lede" v-html="$page.post.excerpt"/>
<!--        <g-image v-if="$page.post.poster" quality="1" width="600" :src="$page.post.poster"/>-->
        <div class="content" v-html="$page.post.content"/>
        <div><img class="end-mark text-center" src="@/assets/images/appventure_logo_nobg.svg" alt="end-mark"/></div>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query ($id: ID!){
  post: blogPost (id: $id) {
    title
    date (format: "D. MMMM YYYY")
    author {
      title
      path
      avatar (width: 60)
    }
    content
    excerpt
  }
}
</page-query>
<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import BlogMeta from '../components/BlogMeta';
@Component({
  components: { BlogMeta },
})
export default class BlogPost extends Vue {}
</script>

<style scoped lang="scss">
.content {
  max-width: 100%;
  &::v-deep img {
    margin-left: -5%;
    max-width: 110%;
  }
}
.lede {
  font-size: 1.2em;
  margin: 3rem auto;
}
.end-mark {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3em;
  width: 1.5em;
}

</style>

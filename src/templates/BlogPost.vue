<template>
  <Layout>
    <main class="blog-post">
      <div>
        <h1>{{ $page.post.title }}</h1>
      </div>
      <div>
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
    content
    excerpt
  }
}
</page-query>
<script>

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
}
.end-mark {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3em;
  width: 1.5em;
}
</style>

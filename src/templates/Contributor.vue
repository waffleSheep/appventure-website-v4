<template>
  <Layout>
    <main class="contributor">
      <div class="contributor-info text-center medium-container">
        <g-image class="author-avatar" :alt="$page.contributor.name" :src="$page.contributor.avatar"/>
        <h1 class="contributor-title">{{$page.contributor.name}}</h1>
        <Epigraph v-if="$page.contributor.quote" :quote="$page.contributor.quote"/>
        <p v-if="$page.contributor.bio" class="bio">{{ $page.contributor.bio }}</p>
      </div>
      <hr/>

      <div class="contributions">
        <div class="timeline">
          <div
            class="tab"
            v-for="type in [Contribution.BLOGPOST,Contribution.PROJECT]"
            :key="type"
            @click="selectedType = type"
            :class="[ selectedType === type ? 'selected' : '' ]"
          >
            {{ contributionLabel(type) }}
          </div>
        </div>

      <div v-if="selectedType === Contribution.BLOGPOST" class="blog-list">
<!--        <h3 class="text-center">Blog posts</h3>-->
        <p class="empty-text text-center" v-if="$page.contributor.posts.edges.length === 0">
          None found
        </p>
        <BlogCard
          class="blog-entries"
          v-for="blog in $page.contributor.posts.edges"
          :key="blog.node.id"
          :blog-post="blog.node"
        />
      </div>
        <div v-if="selectedType === Contribution.PROJECT" class="project-list">
          <p class="empty-text text-center" v-if="$page.contributor.projects.edges.length === 0">
            None found
          </p>
          <ProjectCard
            class="project-entries"
            v-for="project in $page.contributor.projects.edges"
            :key="project.id"
            :project="project.node"
            />
        </div>
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
    projects: belongsTo(filter: {typeName: {eq: Project}}){
      edges {
        node {
          ...on Project {
            id
            allContributors {
              id
              name
            }
            thumbnail (height: 128, width: 128)
            name
            created {
              contributors {
                id
                name
              }
              year
            }
            maintained {
              name
              year
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
  }
}
</page-query>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlogCard from '../components/BlogCard.vue';
import { Contribution } from '../types/Contribution';
import ProjectCard from '../components/ProjectCard.vue';

@Component({
  components: {
    ProjectCard,
    BlogCard,
  },
})

export default class Contributor extends Vue {
  selectedType = Contribution.BLOGPOST;
  Contribution = Contribution;

  contributionLabel(contribution: Contribution) : string {
    switch(contribution) {
      case Contribution.BLOGPOST: return "Blog Posts";
      case Contribution.PROJECT:
      default: return "Projects";
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
.contributions {
  .empty-text {
    font-style: italic;
    font-weight: lighter;
  }
  .timeline {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

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

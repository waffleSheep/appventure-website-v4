<template>
  <Layout>
    <main class="project">
      <div class="project-list">
        <div class="preamble medium-container">
          <h1 class="text-center">Projects</h1>
          <p class="lede text-center">Student made projects that improve the quality of life of those in school as well as the community</p>
        </div>

        <ProjectCard 
          v-for="project in $page.projects.edges"
          :key="project.id"
          :project="project.node"
        />
      </div>
    </main>
  </Layout>
</template>

<page-query>
query ProjectPage {
  projects: allProject {
    edges {
      node {
        id
        thumbnail (height: 128, width: 128)
        name
        created {
          name
          year
        }
        maintained {
          name
          year
        }
      }
    }
  }
}
</page-query>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectCard from '@/components/ProjectCard.vue';

@Component({
  components: { ProjectCard },
})

export default class ProjectsPage extends Vue {
}
</script>

<style scoped lang="scss">
</style>


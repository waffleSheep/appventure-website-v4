<template>
  <Layout>
    <main class="project">
      <div class="project-list">
        <div class="preamble medium-container">
          <h1 class="text-center">
            Projects
          </h1>
          <p class="lede text-center">
            Student made projects that improve the quality of life of those in school as well as the community
          </p>
          <input
            class="search-bar"
            placeholder="Search projects..."
            v-model="searchValue"
          >
          <p>{{ searchIndicator }}</p>
        </div>
        <hr style="margin-bottom: 2rem">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </main>
  </Layout>
</template>

<page-query>
query ProjectPage {
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
  projects: allProject {
    edges {
      node {
        allContributors {
          id
          name
          path
          avatar (width: 30)
        }
        id
        thumbnail (height: 128, width: 128)
        name
        description
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
</page-query>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ProjectCard from '@/components/ProjectCard.vue';
import { Project } from '../types/Project';
import Fuse from 'fuse.js';

import { debounce } from 'lodash';

@Component({
  components: { ProjectCard },
})

export default class ProjectsPage extends Vue {
  loadedProjects: Project[] = [];

  searchValue: string = "";
  searchValueIsDirty: boolean = false;
  isCalculating: boolean = false;

  searcher: Fuse<Project> | undefined;
  filteredProjects: Project[] = [];
  filterProjects: CallableFunction = () => {}; // need to assign in created

  get searchIndicator() {
    if (this.isCalculating) {
      return '⟳ Searching';
    } else if (this.searchValueIsDirty) {
      return '... Typing';
    } else {
      return `✓ ${this.filteredProjects.length} result(s) found`;
    }
  }

  @Watch("searchValue")
  watchSearchValue() {
    this.searchValueIsDirty = true;
    this.filterProjects();
  }

  created() {
    if(this.$route.query.id)
      this.searchValue = this.$route.query.id as string;
    // @ts-ignore
    this.loadedProjects.push(...this.$page.projects.edges.map((n) => n.node));
    this.searcher = new Fuse<Project>(this.loadedProjects, {
      threshold: 0.2,
      keys: ['name', 'allContributors.name', 'tags.name'],
    });

    this.filteredProjects = this.loadedProjects;
    this.filterProjects = debounce(() => {
      if (!this.searcher) return;
      this.isCalculating = true;
      this.filteredProjects = this.searchValue.length
        ? this.searcher.search(this.searchValue).map((r) => r.item) 
        : this.loadedProjects;

      this.isCalculating = false;
      this.searchValueIsDirty = false;
    }, 100);
  }
}
</script>

<style scoped lang="scss">
.preamble {
  .search-bar {
    max-height: inherit;
    font-family: $font-family;
    width: 105%;
    margin-left: -2%;
    margin-bottom: 1rem;

    padding: 2px 8px;
  }
}
</style>

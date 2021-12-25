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

          <div class="filter-box">
            <div class="category-filter">
              <div
                class="tab"
                v-for="category in Object.keys(allProjects)"
                :key="category"
                @click="loadedCategory = category"
                :class="[ loadedCategory == category ? 'selected' : '' ]"
              >
                {{ category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() }}
              </div>
              <hr style="margin-bottom: 2rem">
            </div>

            <input
              class="search-bar"
              placeholder="Search projects..."
              v-model="searchValue"
            >
            <p>{{ searchIndicator }}</p>
          </div>
        </div>

        <div v-for="yearlyProjects in groupedProjects">
          {{ yearlyProjects[0].created.year }}
          <hr/>
          <ProjectCard
            v-for="project in yearlyProjects"
            :key="project.id"
            :project="project"
          />
        </div>

      </div>
    </main>
  </Layout>
</template>

<page-query>
fragment contributionFields on Contribution {
  contributors {
    id
    name
    path
    avatar (width: 30)
  }
  year
}

fragment projectFields on Project {
  id
  thumbnail (height: 128, width: 128)
  name
  description
  created {
    ...contributionFields
  }
  maintained {
    ...contributionFields
  }
  tags (sortBy: "category", order: ASC) {
    id
    name
	description
    category
  }
}

query ProjectPage {
  moduleProjects: allProject(filter: { type: { regex: "^\/Module\/.*" } }) {
    edges {
      node {
        ...projectFields
      }
    }
  }

  competitionProjects: allProject(filter: { type: { regex: "^\/Competition\/.*" } }) {
    edges {
      node {
        ...projectFields
      }
    }
  }

  appventureProjects: allProject(filter: { type: { regex: "^\/AppVenture\/" } }) {
    edges {
      node {
        ...projectFields
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

import { debounce, groupBy } from 'lodash';

@Component({
  components: { ProjectCard },
})

export default class ProjectsPage extends Vue {
  allProjects: { [category: string]: Project[] } = {};
  loadedCategory: string = 'module';

  searchValue: string = "";
  searchValueIsDirty: boolean = false;
  isCalculating: boolean = false;

  searcher: Fuse<Project> | undefined;
  filteredProjects: Project[] = [];
  get groupedProjects() {
    return Object.values(groupBy(this.filteredProjects, project => project.created.year))
      .sort((a, b) => b[0].created.year - a[0].created.year);
  }
  filterProjects: CallableFunction = () => {}; // need to assign in created

	public metaInfo() {
		return {
			title: 'Projects',
		}
	}

  get loadedProjects(): Project[] {
    return this.allProjects[this.loadedCategory];
  }

  get searchIndicator(): string {
    if (this.isCalculating) {
      return '⟳ Searching';
    } else if (this.searchValueIsDirty) {
      return '... Typing';
    } else {
      return `✓ ${this.filteredProjects.length} result(s) found`;
    }
  }

  @Watch("loadedCategory")
  updateSearcher() {
    this.searcher = new Fuse<Project>(this.loadedProjects, {
      threshold: 0.2,
      keys: ['name', 'created.contributors.name', 'tags.name'],
    });
    this.isCalculating = true;
    this.filterProjects = debounce(() => {
      if (!this.searcher) return;
      this.isCalculating = true;
      this.filteredProjects = this.searchValue.length
        ? this.searcher.search(this.searchValue).map((r) => r.item)
        : this.loadedProjects;

      this.isCalculating = false;
      this.searchValueIsDirty = false;
    }, 100);
    this.filterProjects();
		this.$router.push({ query: { category: this.loadedCategory } })
  }

  @Watch("searchValue")
  watchSearchValue() {
    this.searchValueIsDirty = true;
    this.filterProjects();
  }

  created() {
    if (this.$route.query.search)
      this.searchValue = this.$route.query.search as string;
    if (this.$route.query.category)
      this.loadedCategory = this.$route.query.category as string;

    this.allProjects = {
      // @ts-ignore
      module: this.$page.moduleProjects.edges.map((n) => n.node),
      // @ts-ignore
      competition: this.$page.competitionProjects.edges.map((n) => n.node),
      // @ts-ignore
      appventure: this.$page.appventureProjects.edges.map((n) => n.node),
    }

    this.updateSearcher();
  }
}
</script>

<style scoped lang="scss">
.filter-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.category-filter {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: 16px;

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

.search-bar {
  font-family: $font-family;
  text-align: center;

  width: 100%;
  padding: 8px 12px;
  border: 2px solid $primary-color;
  border-radius: 32px;

  margin-bottom: 8px;
}
</style>

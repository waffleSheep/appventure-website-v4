<template>
  <Layout>
    <main class="project">
      <div class="project-list">
        <div class="preamble medium-container">
          <h1 class="text-center">Projects</h1>
          <p class="lede text-center">Student made projects that improve the quality of life of those in school as well as the community</p>
        <multiselect class="search-bar"
                     v-model="searchValue"
                     placeholder="Add search filter"
                     label="name"
                     track-by="id"
                     :closeOnSelect="false"
                     :options="options"
                     :multiple="true"
                     :taggable="true"
                     :maxHeight="240"
                     group-label="type"
                     group-values="entries"
                     @tag="addTag"
        />
<!--        <div class="filter-bar">-->
<!--          <multiselect class="platform-filter"-->
<!--                       v-model="searchValue"-->
<!--                       placeholder="Platform"-->
<!--                       label="name"-->
<!--                       track-by="id"-->
<!--                       :selectLabel="' '"-->
<!--                       :closeOnSelect="false"-->
<!--                       :options="platformOptions"-->
<!--                       :multiple="true"-->
<!--                       :searchable="false"-->

<!--          />-->
<!--        </div>-->
        </div>
        <hr style="margin-bottom: 2rem"/>
        <ProjectCard
          v-for="project in filteredPosts"
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
          name
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
import { Component, Vue } from 'vue-property-decorator';
import ProjectCard from '@/components/ProjectCard.vue';
import Multiselect from 'vue-multiselect';
import { Tag } from '../types/Tag';
import { Contributor } from '../types/Contributor';
import { Project } from '../types/Project';
import Dropdown from '../components/Dropdown.vue';

@Component({
  components: { Dropdown, ProjectCard, Multiselect },
})

export default class ProjectsPage extends Vue {
  searchValue: object[] = [];
  // platformOptions = [{
  //   name: 'android',
  //   id: 'android'
  // }]
  options: object[] = [];
  loadedProjects: Project[] = [];

  get filteredPosts() {
    return this.loadedProjects.filter(project => this.filterPost(project));
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
    this.loadedProjects.push(...this.$page.projects.edges.map(n => n.node));
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
  filterPost(project: Project) : boolean {
    return this.searchValue.every((tag: any) =>{
      return project.tags.find((o: Tag) => o.id === tag.id)
        || project.allContributors.find((o: Contributor) => o.id === tag.id)
        || project.allContributors.find((o: Contributor) => o.name.includes(tag.name))
        || project.name.toLowerCase()
          .concat(" \t " + project.description.toLowerCase())
          .includes(tag.name.toLowerCase());
    });
  }

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"/>
<style scoped lang="scss">
.preamble {
  .search-bar {
    max-height: inherit;
    font-family: $font-family;
    width: 105%;
    margin-left: -2%;
    margin-bottom: 1rem;
  }
  //.filter-bar {
  //  display: flex;
  //  justify-content: flex-end;
  //  margin-top: 1rem;
  //  margin-bottom: 1rem;
  //  .platform-filter {
  //    width: 10rem;
  //  }
  //}
}
::v-deep {
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
</style>


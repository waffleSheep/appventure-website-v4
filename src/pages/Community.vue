<template>
  <Layout>
    <main class="community medium-container">
      <div class="preamble">
        <h1 class="text-center">
          Community
        </h1>
        <p class="lede text-center">
          Projects, events, and other collaborations with school the wider community
        </p>
      </div>
      <hr/>

      <div class="section project">
        <h2 class="title">Projects</h2>
        <div class="content">
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
            :fancy="false"
          />
        </div>
				<p class="text-center">
					<g-link 
						:to="{ path: '/projects', query: {category: 'appventure'} }"
					>
						View More
					</g-link>
				</p> 
			</div>

      <div class="section">
        <h2 class="title">Events</h2>
        <div class="content">
          <div v-for="event in events" class="entry">
          </div>
        </div>
      </div>

    </main>
  </Layout>
</template>

<page-query>

fragment projectFields on Project {
  id
  thumbnail (height: 128, width: 128)
  name
}

query CommunityPage {
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

import { debounce } from 'lodash';

@Component({
  components: { ProjectCard },
})

export default class ProjectsPage extends Vue {
  public readonly projects: Project[] = [];

  public metaInfo() {
    return {
      title: 'Community',
    }
  }

  created() {
    // @ts-ignore
    this.projects = this.$page.appventureProjects.edges.map((n) => n.node);
  }
}
</script>

<style scoped lang="scss">
.project .content {
	display: flex;
	justify-content: center;
}
</style>

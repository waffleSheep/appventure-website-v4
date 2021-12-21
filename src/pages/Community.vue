<template>
  <Layout>
    <main class="community medium-container">
      <div class="preamble">
        <h1 class="text-center">
          Community
        </h1>
        <p class="lede text-center">
          Projects, events, and other collaborations with the school and wider community
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
          <EventCard
						v-for="event in events"
						:key="event.id"
						:event_="event"
						:fancy="true" />
					<p v-if="!events.length" class="text-center">Nothing here yet.</p>
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

fragment eventFields on Event {
  id
  banner (height: 128, width: 256)
  name
	description
	tags {
		id
		name
	}
}

query CommunityPage {
  appventureProjects: allProject(filter: { type: { regex: "^\/AppVenture\/" } }) {
    edges {
      node {
        ...projectFields
      }
    }
  }
	events: allEvent {
		edges {
			node {
				...eventFields
			}
		}
	}
}
</page-query>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ProjectCard from '@/components/ProjectCard.vue';
import EventCard from '@/components/EventCard.vue';
import { Project } from '../types/Project';
import { Event_ } from '../types/Event';

import { debounce } from 'lodash';

@Component({
  components: { ProjectCard, EventCard },
})

export default class ProjectsPage extends Vue {
  public readonly projects: Project[] = [];
  public readonly events: Event_[] = [];

  public metaInfo() {
    return {
      title: 'Community',
    }
  }

  created() {
    // @ts-ignore
    this.projects = this.$page.appventureProjects.edges.map((n) => n.node);
    // @ts-ignore
    this.events = this.$page.events.edges.map((n) => n.node);
  }
}
</script>

<style scoped lang="scss">
.section .content {
	display: flex;
    flex-flow: row wrap;
	justify-content: center;
}
</style>

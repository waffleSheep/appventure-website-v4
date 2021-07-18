<template>
  <Layout>
    <main class="project-showcase">
      <div class="demo">
        <Carousel :gallery="$page.project.gallery" />

        <div class="action-tray">
          <a class="button" v-if="$page.project.website" :href="$page.project.website" target="_blank">
            <globe-icon size="1x" class="icon"></globe-icon>
            Visit Website
          </a>
          <a class="button" v-if="$page.project.attachment" :href="$page.project.attachment.src">
            <download-icon size="1x" class="icon"></download-icon>
            Download
          </a>
        </div>
      </div>

      <div class="info">
        <h1 class="text-center">{{ $page.project.name }}</h1>
        <div class="meta">
          <pre class="type text-center">{{ $page.project.type }}</pre>
          <div class="authors text-left">
            <div v-for="(creator, idx) in creators" :key="creator.id">
              <ContributorTag :contributor="creator" />
              <span v-if="idx < creators.length-2">, </span>
              <span v-if="idx === creators.length-2">, and </span>
            </div>
            <div class="text-center">({{ $page.project.created.year }})</div>
          </div>
          <div class="achievements" v-if="$page.project.achievements">
            <h5>Achievements</h5>
            <ul><li v-for="(a, idx) in $page.project.achievements" :key="a.id">{{ a }}</li></ul>
          </div>
        </div>
        {{ $page.project.description }}
      </div>

    </main>
  </Layout>
</template>

<page-query>
query ($id: ID!){
  project (id: $id) {
    id
    name
    description
    created {
      contributors
      year
    }
    maintained {
      name
      year
    }
    type
    achievements
    gallery (height: 200, width: 150)
    website
    attachment
  }
  authors: allContributor {
    edges {
      node {
        id
        name
        path
        avatar (width: 30)
      }
    }
  }
}
</page-query>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Carousel from '@/components/Carousel.vue';
import { GlobeIcon, DownloadIcon } from 'vue-feather-icons';
import ContributorTag from '../components/ContributorTag.vue';
import { Contributor } from '../types/Contributor';

@Component({
  // @ts-ignore
  components: { ContributorTag, Carousel, GlobeIcon, DownloadIcon },
})
export default class Project extends Vue {
  get creators() : Contributor[] {
    // @ts-ignore
    console.log(this.$page.project.created.contributors);
    // @ts-ignore
    return this.$page.project.created.contributors
      // @ts-ignore
      .map((contId: string) => this.$page.authors.edges
        .map((it: any) => it.node)
        .find((it: any) => it.id === contId))
      .filter((it: any) => it);
  }
}
</script>

<style scoped lang="scss">
.project-showcase {
  display: flex;
  flex-flow: row wrap;

  .demo {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;

    .action-tray {
      display: flex;
      flex-flow: row wrap;

      .button {
        margin: 0 .2rem;
        border-radius: .4rem;

        // temporary fix avoid accidental select when going through carousel
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
  }

  .info {
    flex: 1;
    margin: 0 2rem;

    .meta {
      margin: 2rem 0;

      .type {
        margin: 1rem 0;
        padding: 0;
      }

      .authors {
        margin: 1rem 0;
        font-style: italic;
      }
    }
  }
}
</style>

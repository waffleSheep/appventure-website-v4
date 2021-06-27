<template>
  <Layout>
    <main class="project-showcase">
      <div class="demo">
        <Carousel :gallery="$page.project.gallery" />

        <div class="action-tray">
          <a class="button" v-if="$page.project.website" :href="$page.project.website">
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
        <h5 class="type text-center">{{ $page.project.type }}</h5>
        <div class="created text-center">
          <span v-for="(name, idx) in $page.project.created.name" :key="name.id">
            <span>{{ name }}</span>
            <span v-if="idx < $page.project.created.name.length-2">, </span>
            <span v-if="idx == $page.project.created.name.length-2">, and </span>
          </span>
          ({{ $page.project.created.year }})
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
      name
      year
    }
    maintained {
      name
      year
    }
    type
    gallery (height: 200, width: 150)
    website
    attachment
  }
}
</page-query>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Carousel from '@/components/Carousel.vue';
import { GlobeIcon, DownloadIcon } from 'vue-feather-icons';

@Component({
  // @ts-ignore
  components: { Carousel, GlobeIcon, DownloadIcon },
})
export default class Project extends Vue {
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
      }
    }
  }

  .info {
    flex: 1;
    margin: 0 2rem;

    .created {
      font-style: italic;
    }
  }

}
</style>

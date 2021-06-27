<template>
  <Layout>
    <main class="project-showcase">
      <div class="demo">
        <div class="gallery">
          <g-image class="thumbnail" v-if="activeImage" :src="activeImage" :key="activeImage.id" fit="contain"/>
          <div class="tray">
            <div class="button" @click="prev()">Prev</div>
            <div class="button" @click="next()">Next</div>
          </div>
        </div>

        <a class="button" v-if="$page.project.website" :href="$page.project.website">Visit Website</a>
        <a class="button" v-if="$page.project.attachment" :href="$page.project.attachment.src">Download</a>
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

@Component({
  components: {},
})
export default class Project extends Vue {
  activeIdx = 0;

  get activeImage(): any {
    // @ts-ignore
    if (!this.$page.project.gallery) return null;
    // @ts-ignore
    return this.$page.project.gallery[this.activeIdx];
  }

  prev() {
    this.activeIdx = Math.max(0, this.activeIdx - 1);
  }

  next() {
    // @ts-ignore
    this.activeIdx = Math.min(this.$page.project.gallery.length - 1, this.activeIdx + 1);
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

    .gallery {
      display: flex;
      flex-flow: column nowrap;

      .thumbnail {
        margin: 2px;
        border-radius: 1rem;
        box-shadow: 1px 1px 1px 1px #eee;
      }

      .tray {
        display: flex;
        flex-flow: row wrap;
      }
    }
  }

  .info {
    flex: 1;

    .created {
      font-style: italic;
    }
  }

}
</style>

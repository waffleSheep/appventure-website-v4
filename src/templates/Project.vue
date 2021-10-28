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

        <div v-if="sortedTags.length > 0" class="tags">
          <h5>Tags:</h5>
          <TagChip class="tag-chip"
                   v-for="tag in sortedTags"
                   :key="tag.id"
                   :tag="tag"
                   :filled="false"
                   :link-enabled="true"
          :contribution-type="Contribution.PROJECT">
          </TagChip>
        </div>

        <h5 v-if="maintained.length > 0">Maintenance Log:</h5>
        <div v-if="maintained.length > 0" class="maintenance-log contributors text-left" v-for="maintainers in maintained">
          <div class="creators" v-for="(contributorName, idx) in maintainers.name" :key="contributorName.id">
            <ContributorTag :contributor="getContributorById(contributorName)" />
            <span v-if="idx < maintainers.name.length-2">, </span>
            <span v-if="idx === maintainers.name.length-2">, and </span>
          </div>
          <div class="text-center">({{ maintainers.year }})</div>
          <hr/>
        </div>
      </div>

      <div class="info">
        <h1 class="text-center">{{ $page.project.name }}</h1>
        <div class="meta">
          <pre class="type text-center">{{ $page.project.type }}</pre>

          <hr/>
          <div class="contributors text-left">
            <h5>Created by:</h5>
            <div class="creators" v-for="(creator, idx) in creators" :key="creator.id">
              <ContributorTag :contributor="creator" />
              <span v-if="idx < creators.length-2">, </span>
              <span v-if="idx === creators.length-2">, and </span>
            </div>
            <div class="text-center">({{ $page.project.created.year }})</div>
            <hr/>
          </div>
          <div class="achievements" v-if="$page.project.achievements.length > 0">
            <h5>Achievements</h5>
            <ul><li v-for="(a, _) in $page.project.achievements" :key="a.id">{{ a }}</li></ul>
            <hr/>
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
    allContributors {
      id
      name
      path
      avatar
    }
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
    type
    gallery
    achievements
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
import TagChip from '../components/TagChip.vue';
import { Tag } from '../types/Tag';
import { Contribution } from '../types/Contribution';

@Component({
  // @ts-ignore
  components: { TagChip, ContributorTag, Carousel, GlobeIcon, DownloadIcon },
})
export default class Project extends Vue {
  Contribution = Contribution
  get creators() : Contributor[] {
    // @ts-ignore
    return this.$page.project.created.name
      // @ts-ignore
      .map((contId: string) => this.$page.authors.edges
        .map((it: any) => it.node)
        .find((it: any) => it.id === contId))
      .filter((it: any) => it);
  }
  get sortedTags() : Tag[] {
    // @ts-ignore
    return this.$page.project.tags.sort((u: Tag,v: Tag) => v.category.localeCompare(u.category));
  }

  get maintained() : object {
    // @ts-ignore
    return this.$page.project.maintained;
  }

  getContributorById(id: string): Contributor {
    // @ts-ignore
    const tmp = this.$page.authors.edges.find((u: any) => u.node.id === id)
    return tmp && tmp.node;
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
      align-items: center;
      justify-content: center;

      .button {
        margin: .4rem .4rem;
        border-radius: .4rem;
        width: 46%;

        // temporary fix avoid accidental select when going through carousel
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
    .tag-chip {
      display: inline;
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
      .contributors {
        margin: 1rem 0;
        //font-style: italic;
      }
    }
  }
}
</style>

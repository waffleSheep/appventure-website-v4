<template>
  <Layout>
    <main class="project-showcase">
      <div class="demo">
        <Carousel
          :gallery="$page.project.gallery"
          v-if="$page.project.gallery"
        />

        <div class="action-tray">
          <a
            class="button"
            v-if="$page.project.website"
            :href="$page.project.website"
            target="_blank"
          >
            <globe-icon
              size="1x"
              class="icon"
            />
            Visit Website
          </a>
          <a
            class="button"
            v-if="$page.project.attachment"
            :href="$page.project.attachment.src"
          >
            <download-icon
              size="1x"
              class="icon"
            />
            Download
          </a>
        </div>

        <div
          v-if="sortedTags.length"
          class="tags"
        >
          <h5>Tags:</h5>
          <TagChip
            class="tag-chip"
            v-for="tag in sortedTags"
            :key="tag.id"
            :tag="tag"
            :filled="false"
            :link-enabled="true"
            :router-link="{ path: '/projects', query: {search: tag.id} }"
          />
        </div>

        <div
          class="maintenance-log"
          v-if="maintained && maintained.length"
        >
          <h5>Maintenance Log:</h5>
          <div
            class="maintenance-log contributors text-left"
            v-for="maintainers in maintained"
            :key="maintainers.year"
          >
            <div
              class="creators"
              v-for="(contributor, idx) in maintainers.contributors"
              :key="contributor.id"
            >
              <ContributorTag :contributor="contributor" />
              <span v-if="idx < maintainers.contributors.length-2">, </span>
              <span v-if="idx === maintainers.contributors.length-2">, and </span>
            </div>
            <div class="text-center">
              ({{ maintainers.year }})
            </div>
            <hr>
          </div>
        </div>
      </div>

      <div class="info">
        <h1 class="text-center">
          {{ $page.project.name }}
        </h1>
        <div class="meta">
          <pre class="type text-center">{{ $page.project.type }}</pre>

          <hr>
          <div class="contributors text-left">
            <h5>Created by:</h5>
            <div
              class="creators"
              v-for="(creator, idx) in $page.project.created.contributors"
              :key="creator.id"
            >
              <ContributorTag :contributor="creator" />
              <span v-if="idx < $page.project.created.contributors.length-2">, </span>
              <span v-if="idx === $page.project.created.contributors.length-2">, and </span>
            </div>
            <div
              class="text-center"
              v-if="$page.project.created.year"
            >
              ({{ $page.project.created.year }})
            </div>
            <hr>
          </div>
          <div
            class="achievements"
            v-if="$page.project.achievements && $page.project.achievements.length"
          >
            <h5>Achievements</h5>
            <ul>
              <li
                v-for="a in $page.project.achievements"
                :key="a.id"
              >
                {{ a }}
              </li>
            </ul>
            <hr>
          </div>
        </div>
        <div class="description">{{ $page.project.description }}</div>
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

query ($id: ID!) {
  project (id: $id) {
    ...projectFields
  }
}
</page-query>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Carousel from '@/components/Carousel.vue';
import { GlobeIcon, DownloadIcon } from 'vue-feather-icons';
import ContributorTag from '@/components/ContributorTag.vue';
import TagChip from '@/components/TagChip.vue';

import { Tag } from '@/types/Tag';
import { Contribution } from '@/types/Project';

@Component({
  // @ts-ignore
  components: { TagChip, ContributorTag, Carousel, GlobeIcon, DownloadIcon },
})
export default class Project extends Vue {
	public metaInfo() {
		return {
			// @ts-ignore
			title: 'Project: ' + this.$page.project.name,
		}
	}

  get sortedTags(): Tag[] {
    // @ts-ignore
    return this.$page.project.tags.sort((u: Tag,v: Tag) => v.category.localeCompare(u.category));
  }

  get maintained(): Contribution[] {
    // @ts-ignore
    return this.$page.project.maintained;
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

        // hack to avoid accidental select when going through carousel
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

    .description {
      white-space: pre-wrap;
    }
  }
}

@media (max-width: 620px) {
  .tags {
	margin: 0 auto;
	text-align: center;
  }

  .project-showcase {
    flex-flow: column wrap;
  }
}
</style>

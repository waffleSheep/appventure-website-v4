<template>
  <Layout>
    <main class="event-info">
      <div class="demo">
        <Carousel
          :gallery="$page.event.gallery"
          v-if="$page.event.gallery"
        />

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
      </div>

      <div class="info">
        <h1 class="text-center">
          {{ $page.event.name }}
        </h1>
        <div class="meta">
          <pre class="type text-center">{{ $page.event.type }}</pre>
          <hr>
        </div>
        <div class="description">{{ $page.event.description }}</div>
      </div>
    </main>
  </Layout>
</template>

<page-query>
fragment eventFields on Event {
  id
  banner (height: 128, width: 128)
  name
  description
  tags {
    id
    name
		category
  }
  type
  gallery
}

query ($id: ID!) {
  event (id: $id) {
    ...eventFields
  }
}
</page-query>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Carousel from '@/components/Carousel.vue';
import { GlobeIcon, DownloadIcon } from 'vue-feather-icons';
import TagChip from '@/components/TagChip.vue';

import { Tag } from '@/types/Tag';

@Component({
  // @ts-ignore
  components: { TagChip, Carousel, GlobeIcon, DownloadIcon },
})
export default class Event extends Vue {
	public metaInfo() {
		return {
			// @ts-ignore
			title: 'Event: ' + this.$page.event.name,
		}
	}

  get sortedTags(): Tag[] {
    // @ts-ignore
		if (!this.$page.event.tags) return []
    // @ts-ignore
    return this.$page.event.tags.sort((u: Tag,v: Tag) => v.category.localeCompare(u.category));
  }
}
</script>

<style scoped lang="scss">
.event-info {
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

  .event-info {
    flex-flow: column wrap;
  }
}
</style>

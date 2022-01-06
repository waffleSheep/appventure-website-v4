<template>
  <g-link
    :class="'project-card ' + (fancy ? 'fancy' : 'compact')"
    :to="'/projects/' + project.id"
  >
    <g-image
            class="thumbnail"
            :src="project.thumbnail || 'https://via.placeholder.com/128'" />
    <div class="content">
      <h5 class="name">{{ project.name }}</h5>
      <div v-if="fancy" class="created">
        <span v-for="(c, idx) in project.created.contributors" :key="c.id">
          {{c.name}}<span v-if="idx < project.created.contributors.length-2">, </span>
          <span v-if="idx === project.created.contributors.length-2">, and </span>
        </span>
      </div>
      <div v-if="fancy" class="tags">
        <TagChip
          class="tagChip"
          v-for="tag in project.tags"
          :key="tag.id"
          :tag="tag"
          :filled="false"
          :link-enabled="false" />
      </div>
    </div>
  </g-link>
</template>

<static-query>
</static-query>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import { Tag } from '../types/Tag';
import { Project } from '../types/Project';
import TagChip from './TagChip.vue';
import { Contribution } from '../types/Contribution';
@Component({
  components: { TagChip},
})
export default class ProjectCard extends Vue {
  @Prop() project!: Project;
  @Prop({ default: true }) fancy!: boolean;
  Contribution = Contribution
}
</script>

<style lang="scss" scoped>

.project-card {
  position: relative;
  text-decoration: none;
  color: #404040;
}

.project-card.compact {
  display: flex;
  flex-flow: row wrap;
  margin: 0 16px 64px 16px;

  border-radius: 1rem;
  box-shadow: 0 5px 9px 2px rgba(0, 0, 0, 0.1);

  background-color: white;
  transition: all .2s;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 23px 4px rgba(0, 0, 0, 0.1);
  }

  .thumbnail {
    margin: 4px;
    border-radius: 1rem;
    border: 1px solid #eee;
  }

  .content {
    position: absolute;
    top: 100%;
    width: 100%;
    text-align: center;

    margin-top: 8px;

    .name {
		  margin: 0;

			display: -webkit-box;
		  -webkit-line-clamp: 2;
		  -webkit-box-orient: vertical;
		  overflow: hidden;
		  text-overflow: ellipsis;
		}
  }
}

.project-card.fancy {
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 2rem;

  border-radius: 1rem;
  padding: 4px;
  box-shadow: 0 5px 9px 2px rgba(0, 0, 0, 0.1);

  background-color: white;
  transition: all .3s;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 23px 4px rgba(0, 0, 0, 0.1);
  }

  .thumbnail {
    margin: 2px;
    margin-right: 8px;
    border-radius: 1rem;
    border: 1px solid #eee;
  }

  .content {
    flex: 1;
    height: 128px;
    display: flex;
    flex-flow: column nowrap;
    overflow-y: auto;

    padding-left: 6px;
    .name {
      margin: 16px 0 8px 0;
      padding-right: 0 8px;
    }

    .created {
      padding-right: 0 8px;
      flex: 1;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-items: flex-end;
      height: 36px;
      margin-top: 8px;
    }
  }
}

</style>

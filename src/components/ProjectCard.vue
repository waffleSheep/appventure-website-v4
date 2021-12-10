<template>
  <div class="medium-container project-card">
    <g-link
      class="link"
      :to="'/projects/' + project.id"
    />

    <g-image class="thumbnail" v-if="project.thumbnail" :src="project.thumbnail" />
    <div class="content">
      <h5 class="name">{{ project.name }}</h5>
      <div class="created">
        <span v-for="(c, idx) in project.created.contributors" :key="c.id">
          {{c.name}}<span v-if="idx < project.created.contributors.length-2">, </span>
          <span v-if="idx === project.created.contributors.length-2">, and </span>
        </span>
      </div>
      <div class="tags">
        <TagChip class="tagChip"
                 v-for="tag in project.tags"
                 :key="tag.id"
                 :tag="tag"
                 :filled="false"
                 :link-enabled="false">
        </TagChip>
      </div>
    </div>
  </div>
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
  Contribution = Contribution
}
</script>

<style lang="scss" scoped>

div.project-card {
  position: relative;
  display: flex;
  flex-flow: row wrap;

  border-radius: 1rem;
  margin-bottom: 2rem;

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
    border-radius: 1rem;
    border: 1px solid #eee;
  }

  .content {
    padding: 1rem;
    flex: 1;

    .name {
      margin: 1rem 0 1rem 0;
    }
  }

  .link {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

.tags {
  display: flex;
  justify-content: flex-end;
}

</style>

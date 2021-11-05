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
        <span v-for="(id, idx) in project.created.name" :key="id.id">
          {{id2Contributor(id).name }}<span v-if="idx < project.created.name.length-2">, </span>
          <span v-if="idx === project.created.name.length-2">, and </span>
        </span>
<!--        ({{ project.created.year }})-->
      </div>
      <div class="tags">
        <TagChip class="tagChip"
                 v-for="tag in sortedTags"
                 :key="tag.id"
                 :tag="tag"
                 :link-enabled="true"
                 :contribution-type="Contribution.PROJECT"
                 :filled="false">
        </TagChip>
      </div>
    </div>
  </div>
</template>
<static-query>
query {
  contributors: allContributor {
    edges {
      node{
        id
        name
      }
    }
  }
}
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
  get sortedTags() : Tag[] {
      return this.project.tags.sort((u: Tag,v: Tag) => v.category.localeCompare(u.category));
  }
  id2Contributor(id: string) : string {
    // @ts-ignore
    return this.$static.contributors.edges.map(e => e.node).find(n => n.id === id);
  }
}
</script>

<style lang="scss" scoped>

div.project-card {
  position: relative;
  display: flex;
  flex-flow: row wrap;

  border-radius: 1rem;
  padding: 0;
  margin-bottom: 2rem;


  box-shadow: 1px 1px 1px 1px #eee;

  background-color: white;
  transition: all .3s;
  &:hover {
    filter: brightness(90%);
  }

  .thumbnail {
    margin: 2px;
    border-radius: 1rem;
    box-shadow: 1px 1px 1px 1px #eee;
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

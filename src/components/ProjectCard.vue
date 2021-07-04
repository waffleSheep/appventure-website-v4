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
        <span v-for="(name, idx) in project.created.name" :key="name.id">
          <span>{{ name }}</span>
          <span v-if="idx < project.created.name.length-2">, </span>
          <span v-if="idx == project.created.name.length-2">, and </span>
        </span>
        ({{ project.created.year }})
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
@Component({
  components: {},
})
export default class ProjectCard extends Vue {
  @Prop() project!: object;
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

</style>

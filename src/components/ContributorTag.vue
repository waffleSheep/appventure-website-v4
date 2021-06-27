<template>
  <span>
  <g-link class="author-link" :to="author.path">
    <g-image class="author-avatar" :alt="author.name" :src="author.avatar"/>
  </g-link>
  <g-link class="author-link" :to="author.path">{{ author.name }}</g-link>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Contributor } from '../types/Contributor';

@Component
export default class ContributorTag extends Vue {
  @Prop() author!: Contributor;
}
</script>

<style scoped lang="scss">
.author-avatar {
  width: 30px;
  border-radius: 99px;
  vertical-align: middle;
  margin: 0 6px;

  border: solid 3px transparent;
  transition: border-width 0.1s;
  &:hover {
    border-width: 0;
  }
}
.author-link {
  z-index: 1;
  position: relative;
}
</style>

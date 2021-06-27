<template>
  <span>
  <g-link class="contributor-link" :to="contributor.path">
    <g-image class="contributor-avatar" :alt="contributor.name" :src="contributor.avatar"/>
  </g-link>
  <g-link class="contributor-link" :to="contributor.path">{{ contributor.name }}</g-link>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Contributor } from '../types/Contributor';

@Component
export default class ContributorTag extends Vue {
  @Prop() contributor!: Contributor;
}
</script>

<style scoped lang="scss">
.contributor-avatar {
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
.contributor-link {
  z-index: 1;
  position: relative;
}
</style>

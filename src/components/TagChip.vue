<template>
  <g-link class="round-button chip route" :style="cssProps" :to="routerLink">{{ tag.name }}</g-link>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Tag } from '@/types/Tag';

@Component
export default class TagChip extends Vue {
  @Prop() tag!: Tag;
  @Prop({default: true}) filled!: boolean;
  @Prop({default: true}) linkEnabled!: boolean;
  @Prop() routerLink?: object;

  get cssProps() {
    if (this.filled) {
      return {
        '--color': '#009a90',
        '--chip-color': 'white',
        'pointer-events': this.linkEnabled ? 'auto' : 'none',
      }
    } else {
      return {
        '--color': 'white',
        '--chip-color': '#009a90',
        'pointer-events': this.linkEnabled ? 'auto' : 'none',
      }
    }

  }
}
</script>

<style scoped lang="scss">
.chip {
  z-index: 1;
  position: relative;
  color: var(--color);

  background-color: var(--chip-color);

  font-family: $font-family;
  text-decoration: none;
  font-size: 0.8rem;

  margin: 2px;

  transition: all ease-in-out .2s;

  border: solid var(--chip-color) .15rem;

  &:hover {
    background-color: var(--color);
    color: var(--chip-color);
  }
}
.route {
  padding: .2rem .3rem;
  font-weight: bold;
}
</style>

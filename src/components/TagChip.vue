<template>
  <Button class="round-button chip" :style="cssProps">{{ tag.name }}</Button>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

interface Tag {category: String,name: String}

@Component
export default class TagChip extends Vue {
  @Prop() tag!: Tag;
  @Prop({default: true}) filled!: Boolean;

  get cssProps() {
    if (this.filled) {
      return {
        '--color': '#009a90',
        '--chip-color': 'white'
      }
    } else {
      return {
        '--color': 'white',
        '--chip-color': '#009a90'
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

  padding: .4rem .4rem;
  margin-right: .8rem;

  transition: all ease-in-out .2s;

  border-width: .15rem;
  border-color: var(--chip-color);

  &:hover {
    background-color: var(--color);
    color: var(--chip-color);
  }
}
</style>

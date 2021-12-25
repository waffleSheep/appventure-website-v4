<template>
  <g-link v-if="routerLink" class="round-button chip route" :style="cssProps" :to="routerLink" @click="handleClick">{{ tag.name }}</g-link>
  <span v-else class="round-button chip route" :style="cssProps" :to="routerLink" @click="handleClick">{{ tag.name }}</span>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Tag } from '@/types/Tag';
import Swal from 'sweetalert2';

@Component
export default class TagChip extends Vue {
  @Prop() tag!: Tag;
  @Prop({default: true}) filled!: boolean;
  @Prop({default: true}) linkEnabled!: boolean;
  @Prop() routerLink?: object;
  @Prop() clickHandler?: CallableFunction;

  get cssProps() {
    if (this.filled) {
      return {
        '--color': '#009a90',
        '--chip-color': 'white',
      }
    } else {
      return {
        '--color': 'white',
        '--chip-color': '#009a90',
      }
    }
  }

  handleClick(event: Event) {
	if (this.linkEnabled) return;
	event.preventDefault();
	Swal.fire({
	  title: this.tag.name,
	  text: this.tag.description,
	  icon: 'info',
	  confirmButtonText: 'Cool',
	  confirmButtonColor: '#009a90',
	})
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

  cursor: pointer;

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

<template>
  <div class="medium-container carousel">
    <div class="viewport">
      <g-image class="thumbnail" 
        v-if="activeImage" 
        :src="activeImage" 
        :key="activeImage.id" 
        fit="contain"
      />
    </div>

    <div class="navigation">
      <div class="prev button" @click="prev()">
        <chevron-left-icon size="1.5x"></chevron-left-icon>
      </div>
      <div class="next button" @click="next()">
        <chevron-right-icon size="1.5x"></chevron-right-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import { ChevronLeftIcon, ChevronRightIcon } from 'vue-feather-icons';
@Component({
  // @ts-ignore
  components: { ChevronLeftIcon, ChevronRightIcon },
})
export default class Carousel extends Vue {
  @Prop() gallery!: object[];
  activeIdx = 0;

  get activeImage(): any {
    if (!this.gallery) return null;
    return this.gallery[this.activeIdx];
  }

  prev() {
    this.activeIdx = Math.max(0, this.activeIdx - 1);
  }

  next() {
    this.activeIdx = Math.min(this.gallery.length - 1, this.activeIdx + 1);
  }
}
</script>

<style lang="scss" scoped>

.carousel {
  position: relative;
  margin-top: 2rem;
  margin-bottom: 2rem;

  .viewport {
    display: flex;
    flex-flow: column nowrap;
    .thumbnail {
      margin: 2px;
      border-radius: 1rem;
      box-shadow: 1px 1px 1px 1px #eee;
    }
  }

  .button {
    padding: 0;
    height: 2.4em;
    width: 2.4em;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    filter: saturate(0.2);
    opacity: 0.3;
    transition: all 0.3s;

    &:hover {
      filter: saturate(1.0);
      opacity: 1.0;
    }
  }

  .prev {
    position: absolute;
    left: 0;
    top: calc(50% - 1rem);
  }

  .next {
    position: absolute;
    right: 0;
    top: calc(50% - 1rem);
  }

}

</style>

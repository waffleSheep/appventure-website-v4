<template>
  <div class="medium-container carousel">
    <div ref="viewport" class="viewport" dir="ltr" @scroll="handleScroll">
      <g-image class="image"
        v-for="i in this.gallery"
        :src="i"
        :key="i.src"
      />
    </div>
    <div class="viewport-indicator">
      <div 
        v-for="(i, idx) in this.gallery" 
        :key="i.src"
        :class="'light' + (idx == activeIdx ? ' active' : '')"
        @click="setIndex(idx)"
      >
      </div>
    </div>

    <div class="navigation">
      <div class="prev button" @click="prev()" v-if="gallery && activeIdx > 0">
        <chevron-left-icon size="1.5x" ></chevron-left-icon>
      </div>
      <div class="next button" @click="next()" v-if="gallery && activeIdx < gallery.length-1">
        <chevron-right-icon size="1.5x"></chevron-right-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import { ChevronLeftIcon, ChevronRightIcon } from 'vue-feather-icons';

@Component({
  components: { ChevronLeftIcon, ChevronRightIcon  },
})
export default class Carousel extends Vue {
  @Prop() gallery!: typeof Image[];
  viewport?: HTMLElement;
  activeIdx = 0;
  index = null;
  breakpoints: number[] = [];

  mounted() {
    // @ts-ignore
    this.viewport = this.$refs.viewport;
    this.viewport?.querySelectorAll('img').forEach((e) => {
      this.breakpoints.push(e.offsetLeft);
    });
  }

  prev() {
    this.setIndex(this.activeIdx-1 < 0 ? this.gallery.length-1 : this.activeIdx-1);
  }

  next() {
    this.setIndex(this.activeIdx+1 === this.gallery.length ? 0 : this.activeIdx + 1);
  }

  setIndex(i: number) {
    this.viewport?.querySelectorAll('img')[i].scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }

  handleScroll() {
    if (!this.viewport) return;
    for (let i = this.breakpoints.length-1; i >= 0; --i) { // probably won't have many
      if (this.viewport.scrollLeft >= this.breakpoints[i]-32) {
        this.activeIdx = i;
        break;
      }
    }
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
    flex-flow: row nowrap;
    overflow: auto;
    scroll-snap-type: x mandatory;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar { display: none; } /* Chrome, Safari and Opera */

    .image {
      background-color: white;
      min-height: 5rem;
      flex: none;
      width: 100%;
      margin: 2px;
      border-radius: 1rem;
      box-shadow: 1px 1px 1px 1px #eee;
      scroll-snap-align: center;
    }
  }

  .viewport-indicator {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 8px;

    .light {
      border-radius: 9999px;
      width: 12px;
      height: 12px;
      margin: 0 2px;
      background-color: #ccc;
      cursor: pointer;
    }

    .light.active {
      background-color: $primary-color;
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
    top: calc(50% - 1.5rem);
  }

  .next {
    position: absolute;
    right: 0;
    top: calc(50% - 1.5rem);
  }
}

</style>

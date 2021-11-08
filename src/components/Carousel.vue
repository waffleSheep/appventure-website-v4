<template>
  <div class="medium-container carousel">
    <div class="viewport">
      <g-image class="image"
        v-if="activeImage"
        :src="activeImage"
        :key="activeImage.id"
        @click="index=activeIdx"
        fit="contain"
      />
    </div>
<!--    <div>-->
<!--      <client-only>-->
<!--      <VueGallery-->
<!--        class="gallery"-->
<!--        :images="images"-->
<!--        :index="index"-->
<!--        @close="index=0"-->
<!--      />-->
<!--      </client-only>-->
<!--    </div>-->

    <div class="navigation" v-if="gallery && gallery.length > 1">
      <div class="prev button" @click="prev()">
        <chevron-left-icon size="1.5x" ></chevron-left-icon>
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
// import VueGallery from 'vue-gallery';

@Component({
  // @ts-ignore
  components: { ChevronLeftIcon, ChevronRightIcon  },
})
export default class Carousel extends Vue {
  @Prop() gallery!: object[];
  // @ts-ignore
  // images = this.gallery.map(it => it.src);
  activeIdx = 0;
  index = null;

  get activeImage(): any {
    if (!this.gallery) return null;
    return this.gallery[this.activeIdx];
  }

  prev() {
    this.activeIdx = this.activeIdx -1 === 0 ? this.gallery.length -1 : this.activeIdx-1;
  }

  next() {
    this.activeIdx = this.activeIdx+1 === this.gallery.length ? 0 : this.activeIdx + 1;
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

    .image {
      background-color: white;
      min-height: 5rem;
      width: 100%;
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
.gallery::v-deep {
  img.slide-content {
    background-color: white;
  }
}

</style>

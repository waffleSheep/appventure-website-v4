<template>
  <div class="epigraph">
    <blockquote>
      <p>
        {{ quote }}
      </p>
    </blockquote>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Epigraph extends Vue {
  @Prop({required: true}) quote!: string
}
</script>

<style scoped lang="scss">
.epigraph {
  margin: 1.25em 4rem 2em;
  padding: .5em 2.5em .375em;
  overflow: hidden;
  position: relative;

  blockquote {
    border-left: none;
  }
  blockquote::before, blockquote::after {
    display: block;
    position: absolute;
    font-size: 2.5em;
  }
  blockquote::before {
    content: "\201C";
    top: -.2em;
    left: -.045em;
  }
  blockquote::after {
    content: "\201D";
    bottom: -0.4em;
    right: 0;
  }
  p {
    font-style: italic;
    margin-top: 0;
  }

}

</style>

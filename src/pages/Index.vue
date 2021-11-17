<template>
  <Layout>
    <main class="home">
      <div
        class="iframe-container"
        ref="vpContainer"
        @click="hideVideo"
      >
        <iframe
          ref="vp"
          width="560"
          height="315"
          src=""
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>

      <div
        id="home-banner"
        class="banner medium-container"
        @click="playVideo"
      >
        <div class="info">
          <h1>AppVenture</h1>
          <h3>An adventure into the work of our CS students</h3>
        </div>
        <img
          id="nush-animation"
          alt="NUSH Animation"
          src="@/assets/images/nush_animation.svg"
        >
      </div>

      <div class="banner ctf-banner medium-container">
        <div class="info">
          <h3>Looking for some CTF action? Join us at ctf.nush.app</h3>
          <h4>Current event: MiniCTF #15</h4>
          <a
            class="icon-button-alt la la-link"
            href="https://ctf.nush.app"
          />
          <!-- TODO: Getting current CTF to be automated -->
          <a
            class="icon-button-alt la la-file-alt"
            href="http://localhost:8080/blog/2019/10/08/minictf000/"
          />
        </div>
      </div>
    </main>
  </Layout>
</template>

<style lang="scss" scoped>
.iframe-container {
  display: none;

  position: fixed;
  top: 0; left: 0;
  height: 100%; width: 100%;
  background-color: rgba(0,0,0,0);

  transition: all 0.2s;
  -webkit-transition: all 0.2s;
}

.iframe-container.playing {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  background-color: rgba(0,0,0,0.7);
  z-index: 100;

  &::after {
    color: #fff;
    margin-top: 8px;
    content: "Click anywhere to exit";
  }
}

div.banner {
  border-radius: 1rem;
  color: #fff;

  box-shadow: 0 5px 9px 2px rgba(177, 184, 183, 0.93);

  padding: 1rem 2rem;
  margin: 1.5rem;

  display: flex;
  flex-flow: row wrap;

  .info {
    flex: 1;

    h1, h3, h4 { color: #fff; }
  }
}

#home-banner {
  background-color: $primary-color;
  position: relative;

  &::after {
    content: '\A';
    position: absolute;
    width: 100%; height:100%;
    top:0; left:0;
    border-radius: 1rem;

    font-size: 2rem;

    background:rgba(0,0,0,0.6);
    opacity: 0;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
  }

  &:hover::after {
    cursor: pointer;
    opacity: 1;
    content: "Watch the trailer";

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info h1 {
    background-color: #fff;
    color: $primary-color;
    text-align: center;
    padding: 6px 8px;
    width: auto;
    border-radius: 8px;
    font-weight: 600;
  }
}

#nush-animation {
  width: 60%;
}

.ctf-banner {
  width: 58%;
  background-color: $ctf;
}

a.icon-button {
  text-decoration: none;
  font-size: 2rem;

  border: .2rem solid #fff;
  border-radius: 50%;

  padding: .2rem;

  margin-right: .8rem;

  background-color: #fff;
  color: $primary-color;
  transition: all ease-in-out .2s;

  &:hover {
    background-color: $primary-color;
    color: #fff;
  }
}
a.icon-button-alt {
  text-decoration: none;
  font-size: 2rem;

  border: .2rem solid #fff;
  border-radius: 50%;

  padding: .2rem;

  margin-right: .8rem;

  background-color: #fff;
  color: $ctf;
  transition: all ease-in-out .2s;

  &:hover {
    background-color: $ctf;
    color: #fff;
  }
}

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HomePage extends Vue {
  hideVideo() {
    const vpContainer = this.$refs.vpContainer as HTMLElement;
    vpContainer.classList.remove('playing');
    const vp = this.$refs.vp as HTMLIFrameElement;
    vp.src = "";
  }

  playVideo() {
    const vpContainer = this.$refs.vpContainer as HTMLElement;
    vpContainer.classList.add('playing');
    const vp = this.$refs.vp as HTMLIFrameElement;
    vp.src = "https://www.youtube.com/embed/2XkQUIhuKnY?autoplay=1";
  }
}
</script>

<template>
  <Layout>
    <main class="home">
      <div class="banner home-banner medium-container">
        <div class="info">
          <h3>An adventure into the work of our CS students</h3>

          <a
            class="icon-button lab la-instagram"
            href="https://www.instagram.com/appventure_nush/"
          />
          <a
            class="icon-button lab la-youtube"
            href="https://www.youtube.com/channel/UCBLSYkLt1hFDL7RL8rEeU0w/"
          />
        </div>
        <img
          alt="AppVenture logo"
          src="@/assets/images/nush_animation.svg"
          height="256"
        >
      </div>

      <div class="banner ctf-banner medium-container">
        <div class="info">
          <h3>Looking for some CTF action? Join us at ctf.nush.app</h3>
          <h4>Current event: MiniCTF #15</h4>
          <a
            class="icon-button la la-history"
          />
          <a
            class="icon-button la la-question"
          />
        </div>
      </div>
    </main>
  </Layout>
</template>

<style lang="scss" scoped>
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

    h3,h4 { color: #fff; }
  }
}
.home-banner {
  background-color: $primary-color;
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

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HomePage extends Vue {}
</script>

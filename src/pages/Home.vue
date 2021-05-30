<template>
  <main class="home">
    <div class="banner medium-container">
      <div class="info">
        <h3>An adventure into the work of our CS students</h3>

        <a class="icon-button lab la-instagram" href="https://www.instagram.com/appventure_nush/"></a>
        <a class="icon-button lab la-youtube" href="https://www.youtube.com/channel/UCBLSYkLt1hFDL7RL8rEeU0w/"></a>

      </div>
      <!--<img alt="AppVenture logo" src="../assets/nush_animation.svg" height="256">-->
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/styles/main.scss';

div.banner {
  border-radius: 1rem;
  background-color: $primary-color;
  color: #fff;

  padding: 1rem 2rem;

  display: flex;
  flex-flow: row wrap;

  .info {
    flex: 1;

    h3 { color: #fff; }
  }
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
//import { defineComponent } from 'vue'
//
//export default defineComponent({
//  name: 'Home',
//  components: {
//  }
//})
</script>

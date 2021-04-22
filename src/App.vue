<template>
  <div id="nav" class="medium-container">
    <router-link to="/">AppVenture <span class="tiny-text">by NUS High</span></router-link>
    <span style="flex: 1" />
    <router-link to="/about">About</router-link>
    <router-link to="/projects">Projects</router-link>
    <router-link to="/cybersec">Cybersec</router-link>
    <router-link to="/blog">Blog</router-link>
    <router-link to="/contact">Contact</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
@import '@/styles/main.scss';

main {
  @extend .medium-container;
}

#nav {
  padding: 30px;

  display: flex;
  flex-flow: row wrap;

  a {
    font-weight: bold;
    color: #2c3e50;

    vertical-align: baseline;
    padding: .2rem .6rem;
    margin: 0 .8rem;
    text-decoration: none;
    border-radius: .2rem;

    &.router-link-exact-active {
      color: #009a90;
    }

    &:hover {
      background-color: lightgrey;
    }
  }
}

.tiny-text {
  font-size: .6rem;
}
</style>

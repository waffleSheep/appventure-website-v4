<template>
  <div id="nav" class="medium-container">
    <router-link class="brand" to="/">
      <img alt="AppVenture Logo" src="@/assets/appventure_logo_nobg.svg">
      AppVenture <span class="tiny-text">by NUS High</span>
    </router-link>
    <span style="flex: 1" />
    <router-link to="/about">About</router-link>
    <router-link to="/projects">Projects</router-link>
    <router-link to="/cybersec">Cybersec</router-link>
    <router-link to="/blog">Blog</router-link>
    <router-link to="/contact">Contact</router-link>
  </div>

  <router-view/>

  <div id="footer">
    <div class="medium-container">
      <div class="column">
        <a href="http://www.nushigh.edu.sg">
          <img src="@/assets/nush_logo_color.svg" title="Visit school website" width="146">
        </a>
        <ul class="links">
          <li class="link"><a href="//maps.google.com/?q=20+Clementi+Ave+1,+Singapore+129957" title="Open address in Google Maps"><address>20 Clementi Ave 1, Singapore 129957</address></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/main.scss';

main {
  @extend .medium-container;

  padding-bottom: 4rem;
}

#app {
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;

  align-items: stretch;
}

#nav {
  padding: 30px;

  width: 100%;
  display: flex;
  flex-flow: row wrap;

  .brand {
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    img {
      height: 1.4rem;
      margin: auto 0;
      padding-right: .2rem;
    }

    .tiny-text {
      padding-top: .4rem;
      padding-left: .2rem;
      font-size: .6rem;
    }
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    vertical-align: baseline;
    padding: .2rem .6rem;
    margin: 0 .8rem;
    text-decoration: none;
    border-radius: .4rem;

    &.router-link-exact-active {
      color: #009a90;
    }
  }

  a:not(.brand):hover {
    background-color: #eee;
  }
}

#footer {
  margin-top: auto;
  padding: 1rem;

  border-top: 1px solid #e6e6e6;

  .column {
    padding: 1rem;
    align-items: center;
  }

  ul {
    @extend .row;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-right: 1.2rem;
    }
  }

  .link a, .link address {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #777;
    }
  }
}
</style>

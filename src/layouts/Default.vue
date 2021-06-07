<template>
  <div class="layout">
    <header class="header">
      <g-link
        class="brand"
        to="/"
      >
        <img
          class="logo"
          alt="AppVenture Logo"
          src="@/assets/images/appventure_logo_nobg.svg"
        >
        {{ $static.metadata.siteName }}
        <span class="tiny-text">by NUS High</span>
      </g-link>
      <span style="flex: 1" />
      <nav class="nav">
        <g-link
          class="nav__link"
          to="/about"
        >
          About
        </g-link>
        <g-link
          class="nav__link"
          to="/projects"
        >
          Projects
        </g-link>
        <g-link
          class="nav__link"
          to="/cybersec"
        >
          Cybersec
        </g-link>
        <g-link
          class="nav__link"
          to="/blog"
        >
          Blog
        </g-link>
        <g-link
          class="nav__link"
          to="/contact"
        >
          Contact
        </g-link>
      </nav>
    </header>

    <transition
      name="fade"
      appear
    >
      <main>
        <slot />
      </main>
    </transition>

    <footer>
      <div class="medium-container">
        <div class="column">
          <a href="https://www.nushigh.edu.sg">
            <img
              src="@/assets/images/nush_logo_color.svg"
              alt="school-logo"
              title="Visit school website"
              width="126"
            >
          </a>
          <ul class="links">
            <li class="link">
              <a
                href="//maps.google.com/?q=20+Clementi+Ave+1,+Singapore+129957"
                title="Open address in Google Maps"
              ><address>20 Clementi Ave 1, Singapore 129957</address></a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
  export default {};
</script>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>

<style lang="scss">
.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;

  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
  align-items: stretch;

  main {
    padding-bottom: 4rem;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;

  .brand {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    font-weight: bold;

    &.active, &:hover {
      text-decoration: none;
    }

    .logo {
      height: 1.6rem;
      margin: auto 0;
      padding-right: .2rem;
    }

    .tiny-text {
      padding-top: .4rem;
      padding-left: .2rem;
      font-size: .6rem;
    }
  }
}

.nav__link {
  margin-left: 20px;

  font-weight: bold;
  color: #2c3e50;

  vertical-align: baseline;
  padding: .2rem .6rem;
  margin: 0 .8rem;
  text-decoration: none;
  border-radius: .4rem;

  &.active {
    text-decoration: none;
    color: $primary-color;
  }

  &:hover {
    text-decoration: none;
    background-color: #eee;
  }
}

.fade-enter-active {
  transition: opacity .5s;
}

.fade-enter {
  opacity: 0;
}

footer {
  margin-top: auto;
  padding: 1rem;

  border-top: 1px solid #e6e6e6;

  .column {
    padding: 1rem;
    align-items: center;
  }

  ul {
    display: flex;
    flex-flow: row wrap;

    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-right: 1.2rem;
    }
  }

  .link a, .link address {
    font-size: 0.9rem;
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #777;
    }
  }
}

</style>

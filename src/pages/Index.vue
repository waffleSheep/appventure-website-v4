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
        class="banner medium-container lab"
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

      <div
        id="featured-projects"
      >
        <h1 style="text-align: center; margin-top: 128px">Featured</h1>
        <div class="project-card" v-for="project in featuredProjects" :key="project.id">
          <g-image class="thumbnail" v-if="project.thumbnail" :src="project.thumbnail" />
          <div class="content">
            <h2 class="name">{{ project.name }}</h2>
            <p class="created">
              <span v-for="(c, idx) in project.created.contributors" :key="c.id">
                {{c.name}}<span v-if="idx < project.created.contributors.length-2">, </span>
                <span v-if="idx === project.created.contributors.length-2">, and </span>
              </span>
            </p>
            <p class="achievements">
              <span v-for="(a, idx) in project.achievements" :key="a.id">
                {{a}}
                <span v-if="idx !== project.achievements.length-1" style="margin: auto 4px">·</span>
              </span>
            </p>
            <g-link
              class="link"
              :to="'/projects/' + project.id"
            >
              Read more...
            </g-link>
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query Featured {
  projects: allProject(filter: { featured: { eq: true } }){
    edges {
      node {
        id
        thumbnail (height: 256, width: 256)
        name
        created {
          contributors {
            name
          }
        }
        achievements
      }
    }
  }
}
</page-query>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Project } from '@/types/Project';

@Component
export default class HomePage extends Vue {
  featuredProjects: Project[] = [];

  created() {
    // @ts-ignore
    this.featuredProjects = this.$page.projects.edges.map((p) => p.node);
  }

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
  margin: 1.5rem 0;

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

    font-size: 8rem;

    background:rgba(0,0,0,0.6);
    opacity: 0;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
  }

  &:hover::after {
    cursor: pointer;
    opacity: 1;
    content: "\f167";

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

.project-card {
  position: relative;
  display: flex;
  flex-flow: row wrap;

  border-radius: 1rem;
  margin-top: 128px;

  .thumbnail {
    border-radius: 1rem;
    box-shadow: 1px 1px 1px 1px #eee;
  }

  .content {
    flex: 1;
    .name { margin-top: 0; }
    .created { font-style: italic; }
  }
}

.project-card:nth-child(even) {
  .content {
    margin-left: 64px;
    text-align: left;
  }
}

.project-card:nth-child(odd) {
  flex-direction: row-reverse;
  .content {
    margin-right: 64px;
    text-align: right;
  }
}

</style>

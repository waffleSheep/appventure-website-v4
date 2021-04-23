<template>
  <main class="about">
    <h1>What's AppVenture?</h1>
    <p>AppVenture is a community consisting of passionate students from NUS High. We develop a wide range of apps to benefit staff and students from NUS High.</p>
    <p>This website showcases outstanding CS projects done by students from NUS High. These apps are handpicked by staff and range from small utility apps to award-winning projects. AppVenture aims to recognise the efforts students have put into their projects, and at the same time publicise the apps to those who may find them useful. Take a look to see what we are doing at NUS High!</p>

    <h1>The Team</h1>
    <div class="timeline">
      <div class="tab" v-for="(profiles, year) in teams" v-bind:key="year" v-on:click="selectedYear = year" :class="[ selectedYear == year ? 'selected' : '' ]">{{ year }}</div>
    </div>

    <div v-for="(profiles, year) in teams" v-bind:key="year">
      <div class="team" v-if="selectedYear == year">
        <Profile v-for="p in profiles" v-bind:key="p.id" v-bind="p" />
      </div>
    </div>

    <h1>Credits</h1>
    <p>The earliest version of this site was hand-crafted by <a href="https://ambrose.makerforce.io/">Ambrose</a> and Wayne.</p>
    <p>The next iteration was a rewrite in javascript by Xavier.</p>
    <p>This version, heavily based on earlier works, is designed and maintained by Yue Chen, _____ (TBC).</p>
  </main>
</template>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.timeline {
  display: flex;
  justify-content: center;

  .tab {
    padding: .2rem .4rem;
    margin: 0 .4rem;
    border-radius: .4rem;

    &:hover {
      background-color: #eee;
      cursor: pointer;
    }

    &.selected {
      color: $primary-color;
      font-weight: bold;
    }
  }
}

.team {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Profile from '@/components/Profile.vue'
// import axios from 'axios'

export default defineComponent({
  name: 'About',
  components: {
    Profile
  },
  data () {
    return {
      selectedYear: 2021,
      teams: {
        2017: [
          { name: 'Wayne', description: 'Wayne believes in using technology to make life better. Interested in everything from cryptography to web development, Wayne looks forward to the exciting world ahead. He is also Ambrose\'s best friend.' },
          { name: 'Ambrose', description: 'Ambrose started programming when he first went into robotics but went on to learn Python. He started his adventures in building websites and used to run them from a laptop at home, but since then has upgraded. He loves anything computerish. He is also Wayne\'s best friend.' }
        ],
        2018: [
        ],
        2019: [
        ],
        2021: [
        ]
      }
      // profiles: null
    }
  }
  // created: function () {
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/users')
  //     .then(res => {
  //       console.log(res)
  //       this.profiles = res.data
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
})
</script>

<template>
  <div class="profile">
    <img
      :title="name"
      :alt="name"
      :src="avatar"
      class="picture"
      v-if="avatar"
    >
    <div class="text">
      <h3>{{ name }}</h3>
      <h5>{{ position }}</h5>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-flow: column nowrap;

  margin: 1rem;
  width: 16rem;

  .picture {
    border-radius: 8px;
    margin: 1rem 2rem 1rem 0;
    width: 100%;
  }

  .text {
    text-align: center;

    h3 {
      margin: 0;
    }

    h5 {
      font-style: italic;
      margin-top: 4px;
      margin-bottom: 8px;
      color: #ccc;
      font-size: 1rem;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const ProfileProps = Vue.extend({
  props: {
    name: {
      default: '',
      type: String,
    },
    position: {
      default: '',
      type: String,
    },
    description: {
      default: '',
      type: String,
    },
  },
});

@Component
export default class Profile extends ProfileProps {
  get avatar() {
    const fileName = this.name.toLowerCase().replace(' ', '_');
    try {
      return require(`@/assets/images/profiles/${fileName}.jpg`);
    } catch {
      return undefined;
    }
  }
}
</script>

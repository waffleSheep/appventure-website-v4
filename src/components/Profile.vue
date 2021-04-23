<template>
  <div class="profile">
    <img :title="name" :alt="name" :src="avatar" class="picture">
    <div class="text">
      <h3>{{ name }}</h3>
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
  }
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Profile',
  computed: {
    avatar () {
      if (!this.name) {
        return
      }
      const fileName = this.name.toLowerCase().replace(' ', '_')
      return require(`@/assets/profiles/${fileName}.jpg`) // the module request
    }
  },
  props: {
    name: String,
    description: String
  }
})
</script>

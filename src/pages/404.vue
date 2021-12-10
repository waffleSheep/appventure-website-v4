<template>
  <Layout>
    <main>
      <div class="preamble medium-container lede text-center">
        <h1 class="text-center">Oops!</h1>
        <p>
			The page cannot be found. Go back to the <g-link to="/">homepage</g-link>?
        </p>
      </div>
    </main>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ErrorPage extends Vue {
	public metaInfo() {
		return {
			title: 'Not Found',
		}
	}
}
</script>

<style scoped lang="scss">
</style>


<template>
  <Layout>
    <main>
      <div class="preamble medium-container lede text-center">
        <h1 class="text-center">Contact</h1>
        <p>
          Enquiries? Email us at
          <a href="mailto:appventure@nushigh.edu.sg">appventure@nushigh.edu.sg</a>.
        </p>
        <p>
          For admission and general school hotlines, visit our
          <a href="https://www.nushigh.edu.sg/our-dna/contact-us">school website</a>.
        </p>
        <p>
          <a
            class="icon-button lab la-instagram"
            href="https://www.instagram.com/appventure_nush/"
          />
          <a
            class="icon-button lab la-youtube"
            href="https://www.youtube.com/channel/UCBLSYkLt1hFDL7RL8rEeU0w/"
          />
        </p>
      </div>

      <hr/>
      <h2>
        Joining us
      </h2>
      <p class="lede">
        If you are a current NUSH student interested to join AppVenture, please see <g-link to="/about#join">here</g-link>.
      </p>

      <h2>
        Requests
      </h2>
      <p class="lede">We want to hear your app ideas! If you have an idea you need help bringing into reality, fill in the form below and we will get back to you! (Limited to those within the school)</p>
      <iframe width="100%" height= "480px" src= "https://forms.office.com/Pages/ResponsePage.aspx?id=cnEq1_jViUiahddCR1FZKj6EDIDhbU5EohvQH6Z2Dw1UNzIxQkJEWlVaQ0JXN0ExRTg2M1EwMVM5Si4u&embed=true" frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>
    </main>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ContactPage extends Vue {
	public metaInfo() {
		return {
			title: 'Contact',
		}
	}
}
</script>

<style scoped lang="scss">
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
a.icon-button-alt {
  text-decoration: none;
  font-size: 2rem;

  border: .2rem solid #fff;
  border-radius: 50%;

  padding: .2rem;

  margin-right: .8rem;

  background-color: #fff;
  color: $ctf;
  transition: all ease-in-out .2s;

  &:hover {
    background-color: $ctf;
    color: #fff;
  }
}
</style>


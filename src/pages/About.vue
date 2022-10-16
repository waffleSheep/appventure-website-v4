<template>
  <Layout>
    <main class="about">
      <h1 id="appventure">What's AppVenture?</h1>
      <p>One of the student interest groups in NUS High, we are a community of passionate students in Computer Science. In AppVenture, we develop a wide range of apps to benefit staff and students, compete in Capture the Flag (CTF) competitions, and also hold events and workshops to share our love for Computer Science.</p>
      <p>This website showcases students' outstanding CS projects, curated blog articles written by our members, and latest updates of our internal and outreach activities. We aim to recognise the students' efforts and also publicise them to whom may find them useful. Take a look to see what we are doing at NUS High!</p>

      <h1 id="team">The Team</h1>
      <p>We started way back in 2017, but only welcomed the first batch of members in 2019 - we're a young interest group!</p>
      <p>In year n+1, our activities are overseen by a executive committee consisting of senior members in the interest group formed in year n. Nominated members at the end of the fourth year are encouraged to submit their applications to join the team.</p>
      <div class="timeline">
        <div
          class="tab"
          v-for="(profiles, year) in teams"
          :key="year"
          @click="selectedYear = year"
          :class="[ selectedYear == year ? 'selected' : '' ]"
        >
          {{ year }}
        </div>
      </div>

      <div
        v-for="(profiles, year) in teams"
        :key="year"
      >
        <div
          class="team"
          v-if="selectedYear == year"
        >
          <Profile
            v-for="p in profiles"
            :key="p.id"
            v-bind="p"
          />
        </div>
      </div>

      <h1>How's it like in AppVenture?</h1>
      <p>As a member, you will have the option to join the Project or Cybersecurity division (or both).</p>
      <div
        class="accordion"
        @click="toggle($event)"
      >
        <div class="title">
          What are the requirements?
        </div>
        <div class="content">
          <p><strong>Project division</strong>: members are expected to complete <strong>at least one project</strong> and present them at our annual project fair.</p>
          <p><strong>Cybersecurity division</strong>: members are expected to compete in <strong>at least one internal or external CTFs</strong>.</p>
        </div>
      </div>
      <p>While we have expectations for our members, please don't feel intimidated or limited by them. These guidelines are in place to help both you and us evaluate if we are the right interest group for you. We believe these are easy to achieve as long as you choose to participate in whatever you love to do here.</p>
      <p>You can also look forward to joining us on exclusive learning journeys and sharings conducted by your schoolmates and alumni. Every month, we will also have mini online gatherings where you can share about your latest projects, discuss CS news, and learn from one another while you forge strong inter-level connections with like-minded people. Biannually, we will also hold workshops conducted by interested members and general meetings for networking and sharing of updates.</p>
      <div
        class="accordion"
        @click="toggle($event)"
      >
        <div class="title">
          Are these activities compulsory?
        </div>
        <div class="content">
          <p>Apart from the general meetings, no, these activities are <strong>not compulsory</strong>. So don't fret if you are unable to join us every now and then (although we certainly hope you do!), but you should try to participate in them to gain the most out of the interest group.</p>
        </div>
      </div>

      <h1 id="join">Interested to join us?</h1>
      <p>Do you have a passion for coding? Do you want to learn more about CS and share your ideas with like-minded people? Or would you like to practice your skills to help give back to the community in some way?</p>
      <p>AppVenture is all about technical skills, leadership and community service. If you're a current NUS High student who shares our love for Computer Science and belief improving lives using technology, keep an eye out for our yearly recruitment! Even if you do not take Computer Science modules, do apply if you're interested and we will review your application on case-by-case basis. 🙂</p>

      <div style="display: flex; justify-content: center">
        <a
          class="application-btn enabled"
          v-if="applicationLink"
          href="applicationLink"
        >Apply now!</a>
        <a
          class="application-btn disabled"
          v-else
          href="#"
        >Applications are closed</a>
      </div>

      <h1>Credits</h1>
      <p>The earliest version of this site was hand-crafted by <a href="https://ambrose.makerforce.io/">Ambrose</a> (Class of 2018) and Wayne (Class of 2017).</p>
      <p>The next iteration was a rewrite in javascript by Xavier (Class of 2019).</p>
      <p>This version, heavily based on earlier works, is designed and maintained by Yue Chen (Class of 2021) and Kannan Vishal (Class of 2023).</p>
    </main>
  </Layout>
</template>

<style lang="scss" scoped>
.timeline {
  overflow-x: auto;
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

.accordion {
  box-shadow: 0 0 2px 1px #eee;
  border-radius: 4px;
  margin-block-end: 16px;
  background-color: white;

  .title {
    cursor: pointer;
    padding: 12px 16px;
    font-weight: bold;

    transition: all ease 0.1s;

    &:hover {
      color: #009a90;
      box-shadow: 0 0 2px 2px #eee;
      transform: translate3d(0, -1px, 10px);
    }
  }

  .content {
    display: none;
  }

  .content.visible {
    display: block;
    padding: 12px 16px;
    border-top: 1px solid #eee;
  }
}

.application-btn {
  padding: 6px 8px;
  border-radius: 2px;
  margin: 0 auto;
  text-decoration: none;
  transition: all ease 0.2s;
}

.application-btn.enabled {
  background-color: #009a90;
  color: white;
  border: 2px solid #009a90;
  &:hover {
    background-color: white;
    color: #009a90;
  }
}


.application-btn.disabled {
  background-color: #eee;
  color: grey;
  border: 2px solid grey;
  pointer-events: unset;
  cursor: not-allowed;
}

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Profile from '~/components/Profile.vue';

@Component({
  components: {
    Profile,
  },
})
export default class AboutPage extends Vue {
  public readonly applicationLink = null;

	public metaInfo() {
		return {
			title: 'About',
		}
	}

  public data() {
    return {
      selectedYear: 2022,
      teams: {
        2017: [
          { name: 'Wayne', description: 'Wayne believes in using technology to make life better. Interested in everything from cryptography to web development, Wayne looks forward to the exciting world ahead. He is also Ambrose\'s best friend.' },
          { name: 'Ambrose', description: 'Ambrose started programming when he first went into robotics but went on to learn Python. He started his adventures in building websites and used to run them from a laptop at home, but since then has upgraded. He loves anything computerish. He is also Wayne\'s best friend.' },
        ],
        2018: [
          { name: 'Ambrose', description: 'Ambrose started programming when he first went into robotics but went on to learn Python. He started his adventures in building websites and used to run them from a laptop at home, but since then has upgraded. He loves anything computerish. He is also Wayne\'s best friend.' },
          { name: 'Daniel', description: '' },
          { name: 'Roy', description: '' },
        ],
        2019: [
          { name: 'Linh', position: 'President', description: '' },
          { name: 'Roy', position: 'Vice-President', description: '' },
          { name: 'Xavier', position: 'Infrastructure IC', description: '' },
          { name: 'Jianxi', position: 'Project IC', description: '' },
          { name: 'Dave', position: 'Project IC', description: '' },
          { name: 'Deepak', position: 'Events IC', description: '' },
          { name: 'Jaime', position: 'Events IC', description: '' },
          { name: 'Yitian', positon: 'Events IC', description: '' },
        ],
        2020: [
          { name: 'Jian Xi', position: 'President', description: '' },
          { name: 'Jaime', position: 'Vice-President', description: '' },
          { name: 'Yitian', description: '' },
          { name: 'Dave', description: '' },
          { name: 'Yue Chen', description: '' },
          { name: 'Wern Jie', description: '' },
          { name: 'Jun Rong', description: '' },
        ],
        2021: [
          { name: 'Yue Chen', position: 'President', description: '' },
          { name: 'Jun Rong', position: 'Vice-President', description: '' },
          { name: 'Steve', position: 'Project IC', description: '' },
          { name: 'Javier', position: 'Cybersecurity IC', description: '' },
          { name: 'Wern Jie', position: 'Outreach IC', description: '' },
          { name: 'Ranen', position: 'Event IC', description: '' },
          { name: 'Jed', position: 'Development IC', description: '' },
        ],
        2022: [
          { name: 'Jun Rong', position: 'President', description: '' },
          { name: 'Javier', position: 'Vice-President & Cybersecurity IC', description: '' },
          { name: 'Steve', position: 'Project IC', description: '' },
          { name: 'Jed', position: 'Development IC', description: '' },
          { name: 'Prannaya', position: 'Outreach & Events IC', description: '' },
          { name: 'Vishal', position: 'Infrastructure IC', description: '' },
          { name: 'Wenkai', position: 'Infrastructure IC', description: '' },
        ],
        2023: [
          { name: 'Jed', position: 'Development IC', description: '' },
          { name: 'Vishal', position: 'Infrastructure IC', description: '' },
          { name: 'Prannaya', position: 'Outreach IC', description: '' },
          { name: 'Kai Wen', position: 'Events IC', description: '' },
          { name: 'Wenkai', position: 'Projects IC', description: '' },
          { name: 'Mahir', position: 'Cybersecurity IC', description: '' },
        ],
        Teachers: [
          { name: 'Mrs Phylliscia Lee', position: 'Overall TIC', description: '' },
        ],
      },
    };
  }

  toggle(event: Event) {
    let par = (event.target as HTMLElement).parentElement;
    if (!par) return;
    let child = par.querySelector('.content');
    if (!child) return;
    child.classList.toggle('visible');
  }
}
</script>

<template>
  <div :class="'event-card ' + (fancy ? 'fancy' : 'compact')">
    <g-link
      class="link"
      :to="'/events/' + event_.id"
    />

    <g-image 
			class="banner"
			:src="event_.banner || 'https://via.placeholder.com/256x128'" />
    <div class="content">
      <h5 class="name">{{ event_.name }}</h5>
			<div v-if="fancy">{{ event_.description }}</div>
      <div v-if="fancy" class="tags">
        <TagChip 
          class="tagChip"
          v-for="tag in event_.tags"
          :key="tag.id"
          :tag="tag"
          :filled="true"
          :link-enabled="false" />
      </div>
    </div>
  </div>
</template>

<static-query>
</static-query>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import { Tag } from '../types/Tag';
import { Event_ } from '../types/Event';
import TagChip from './TagChip.vue';

@Component({
  components: { TagChip },
})
export default class EventCard extends Vue {
  @Prop() event_!: Event_;
  @Prop({ default: true }) fancy!: boolean;
}
</script>

<style lang="scss" scoped>
.event-card {
  position: relative;

  .link {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  margin-bottom: 2rem;

  display: flex;
  flex-flow: column wrap;
	align-items: center;

  border-radius: 1rem;
  box-shadow: 0 5px 9px 2px rgba(0, 0, 0, 0.1);

  background-color: white;
  transition: all .3s;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 23px 4px rgba(0, 0, 0, 0.1);
  }

  .banner {
    border-radius: 1rem;
    border: 1px solid #eee;
		width: 100%;
		object-fit: cover;
  }

	.content {
		text-align: center;
		margin: 0 4px;

		.name {
			margin: 8px 0;
		}
	}

  .tags {
    display: flex;
    justify-content: flex-end;
		padding: 4px 8px;
  }
}

</style>

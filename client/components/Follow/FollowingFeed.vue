<template>
  <div class="following-feed">
    <h2>Following Feed</h2>
    <div v-if="freets !== null">
      <p v-if="freets.length === 0">No freets found. Try following someone!</p>
      <FreetComponent
        v-for="freet in freets"
        :key="freet.id"
        :freet="freet"
      />
    </div>
    <p v-else>Loading freets</p>
  </div>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
  name: 'FollowingFeed',
  components: {FreetComponent},
  data() {
    return {
      freets: null
    };
  },
  async mounted() {
    const response = await fetch(`/api/follow/feed`, {method: "GET"});
    this.freets = await response.json();
  }
};
</script>

<style scoped>
.following-feed {
  padding: 0 5em 5em;
}
</style>
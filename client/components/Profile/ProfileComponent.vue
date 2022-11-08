<template>
  <div class="profile">
    <h2>@{{username}}</h2>
    <FollowComponent
      :username="username"
    />
    <FreetComponent
      v-for="freet in freets"
      :key="freet.id"
      :freet="freet"
    />
  </div>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import FollowComponent from '@/components/Follow/FollowComponent.vue';

export default {
  name: 'ProfileComponent',
  components: {FreetComponent, FollowComponent},
  props: {
    username: {
      type: String,
      required: true
    }
  },
  watch: {
    username: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.refreshProfile();
      }
    }
  },
  data() {
    return {
      freets: []
    };
  },
  async mounted() {
    this.refreshProfile();
  },
  methods: {
    async refreshProfile() {
      const response = await fetch(`/api/freets?author=${this.username}`, {method: "GET"});
      this.freets = await response.json();
    }
  }
};
</script>
<template>
  <div class="follow-information" v-if="following !== null && followers !== null">
    <p class="follow-numbers">
      Followers: {{followers.length}}, Following: {{following.length}}
    </p>
    <div class="follow-buttons" v-if="$store.state.username && username !== $store.state.username">
      <button
        @click="unfollowUser"
        v-if="followers.includes($store.state.username)">
        Unfollow
      </button>
      <button
        @click="followUser"
        v-else>
        Follow
      </button>
    </div>
    <div class="follow-list-buttons">
      <button @click="showingFollowers = true; showingFollowing = false" v-if="!showingFollowers">
        Show Followers
      </button>
      <button @click="showingFollowers = false" v-else>
        Hide Followers
      </button>
      <button @click="showingFollowing = true; showingFollowers = false" v-if="!showingFollowing">
        Show Following
      </button>
      <button @click="showingFollowing = false" v-else>
        Hide Following
      </button>
      <div v-if="showingFollowers">
        <p><b>Followers</b></p>
        <p v-for="username in followers">
          @{{username}}
        </p>
        <p v-if="followers.length === 0"><i>No followers</i></p>
      </div>
      <div v-if="showingFollowing">
        <p><b>Following</b></p>
        <p v-for="username in following">
          @{{username}}
        </p>
        <p v-if="following.length === 0"><i>Not following anyone</i></p>
      </div>
    </div>
  </div>
  <p class="follow-information" v-else>Loading follow information</p>
</template>

<script>
export default {
  name: 'FollowComponent',
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
        this.refreshFollows();
      }
    }
  },
  data() {
    return {
      userId: null,
      following: null,
      followers: null,
      showingFollowing: false,
      showingFollowers: false
    };
  },
  async mounted() {
    await this.refreshFollows();
  },
  methods: {
    async refreshFollows() {
    this.userId = await (await fetch(`/api/users/${this.username}`, {method: "GET"})).json();
      const following = await (await fetch(`/api/follow/following/${this.userId}`, {method: "GET"})).json();
      const followers = await (await fetch(`/api/follow/followers/${this.userId}`, {method: "GET"})).json();
      this.following = following;
      this.followers = followers;
    },
    async followUser() {
      const response = await (await fetch(`/api/follow/${this.userId}`, {method: "POST"})).json();
      this.refreshFollows();
    },
    async unfollowUser() {
      const response = await (await fetch(`/api/follow/${this.userId}`, {method: "DELETE"})).json();
      this.refreshFollows();
    }
  }
};
</script>

<style scoped>
.follow-information {
  margin-bottom: 1em;
}
</style>
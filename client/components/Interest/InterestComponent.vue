<template>
  <div class="interest" v-if="interested !== null && notInterested !== null">
    <p class="interest-numbers" v-if="$store.state.username === freetAuthor">
      Interested Users: {{ interested.length }}, Not Interested Users: {{ notInterested.length }}
    </p>

    <div class="interest-list-buttons" v-if="$store.state.username === freetAuthor">
      <button @click="showingInterested = true; showingNotInterested = false" v-if="!showingInterested">
        Show Interested Users
      </button>
      <button @click="showingInterested = false" v-else>
        Hide Interested Users
      </button>
      <button @click="showingNotInterested = true; showingInterested = false" v-if="!showingNotInterested">
        Show Not Interested Users
      </button>
      <button @click="showingNotInterested = false" v-else>
        Hide Not Interested Users
      </button>
      <div v-if="showingInterested">
        <p><b>Interested Users</b></p>
        <p v-for="username in interested">
          @{{username}}
        </p>
        <p v-if="interested.length === 0"><i>No interested users</i></p>
      </div>
      <div v-if="showingNotInterested">
        <p><b>Not Interested Users</b></p>
        <p v-for="username in notInterested">
          @{{username}}
        </p>
        <p v-if="notInterested.length === 0"><i>No not interested users</i></p>
      </div>
    </div>

    <div class="interest-buttons" v-if="$store.state.username !== null">
      <button @click="interestedInFreet" v-if="!interested.includes($store.state.username)">
        🙂 Interested
      </button>
      <button @click="revokeInterest" v-else>
        Revoke Interest
      </button>

      <button @click="notInterestedInFreet" v-if="!notInterested.includes($store.state.username)">
        🙁 Not Interested
      </button>
      <button @click="revokeInterest" v-else>
        Revoke Disinterest
      </button>
    </div>
  </div>
  <p class="interest" v-else>Loading interest</p>
</template>

<script>
export default {
  name: 'InterestComponent',
  props: {
    freetId: {
      type: String,
      required: true
    },
    freetAuthor: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      interested: null,
      notInterested: null,
      showingInterested: false,
      showingNotInterested: false
    }
  },
  async mounted () {
    await this.refreshInterest();
  },
  methods: {
    async refreshInterest() {
      const response = await fetch(`/api/interest/freet/${this.freetId}`, {method: "GET"});
      const interest = await response.json();
      this.interested = interest.interested;
      this.notInterested = interest.notInterested;
    },
    async interestedInFreet() {
      const response = await fetch(`/api/interest/${this.freetId}/interested`, {method: "PUT"});
      await this.refreshInterest();
    },
    async notInterestedInFreet() {
      const response = await fetch(`/api/interest/${this.freetId}/not-interested`, {method: "PUT"});
      await this.refreshInterest();
    },
    async revokeInterest() {
      const response = await fetch(`/api/interest/${this.freetId}`, {method: "DELETE"});
      await this.refreshInterest();
    }
  }
};
</script>
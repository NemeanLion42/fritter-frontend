<template>
  <div class="votes" v-if="upvotes !== null && downvotes !== null">
    <p class="vote-numbers">
      Upvotes: {{ upvotes.length }}, Downvotes: {{ downvotes.length }}
    </p>

    <div class="vote-list-buttons" v-if="$store.state.username === freetAuthor">
      <button @click="showingUpvotes = true; showingDownvotes = false" v-if="!showingUpvotes">
        Show Upvotes
      </button>
      <button @click="showingUpvotes = false" v-else>
        Hide Upvotes
      </button>
      <button @click="showingDownvotes = true; showingUpvotes = false" v-if="!showingDownvotes">
        Show Downvotes
      </button>
      <button @click="showingDownvotes = false" v-else>
        Hide Downvotes
      </button>
      <div v-if="showingUpvotes">
        <p><b>Upvotes</b></p>
        <p v-for="username in upvotes">
          @{{username}}
        </p>
        <p v-if="upvotes.length === 0"><i>No upvotes</i></p>
      </div>
      <div v-if="showingDownvotes">
        <p><b>Downvotes</b></p>
        <p v-for="username in downvotes">
          @{{username}}
        </p>
        <p v-if="downvotes.length === 0"><i>No downvotes</i></p>
      </div>
    </div>

    <div class="vote-buttons" v-if="$store.state.username !== null">
      <button @click="upvoteFreet" v-if="!upvotes.includes($store.state.username)">
        Upvote
      </button>
      <button @click="revokeVote" v-else>
        Revoke Upvote
      </button>

      <button @click="downvoteFreet" v-if="!downvotes.includes($store.state.username)">
        Downvote
      </button>
      <button @click="revokeVote" v-else>
        Revoke Downvote
      </button>
    </div>
  </div>
  <p class="votes" v-else>Loading votes</p>
</template>

<script>
export default {
  name: 'VoteComponent',
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
      upvotes: null,
      downvotes: null,
      showingUpvotes: false,
      showingDownvotes: false
    }
  },
  async mounted () {
    await this.refreshVotes();
  },
  methods: {
    async refreshVotes() {
      const response = await fetch(`/api/vote/freet/${this.freetId}`, {method: "GET"});
      // const response = 3;
      const votes = await response.json();
      this.upvotes = votes.upvote;
      this.downvotes = votes.downvote;
      // console.log(this.upvotes);
    },
    async upvoteFreet() {
      const response = await fetch(`/api/vote/${this.freetId}/upvote`, {method: "PUT"});
      await this.refreshVotes();
    },
    async downvoteFreet() {
      const response = await fetch(`/api/vote/${this.freetId}/downvote`, {method: "PUT"});
      await this.refreshVotes();
    },
    async revokeVote() {
      const response = await fetch(`/api/vote/${this.freetId}`, {method: "DELETE"});
      await this.refreshVotes();
    }
  }
};
</script>
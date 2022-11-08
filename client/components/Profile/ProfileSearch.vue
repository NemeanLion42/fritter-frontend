<template>
  <div class="other-profile">
    <input
      v-model="value"
      type="text"
      :placeholder='"Profile to show"'
      v-on:keyup.enter="inputUsername"
    >
    <button @click="inputUsername">
      Show profile
    </button>
    <p v-if="showingError">{{errorMessage}}</p>
    <ProfileComponent
      v-if="username"
      :username="username"
    />
    
  </div>
</template>

<script>
import ProfileComponent from '@/components/Profile/ProfileComponent.vue';

export default {
  name: 'ProfileSearch',
  components: {ProfileComponent},
  data() {
    return {
      username: null,
      value: null,
      showingError: false,
      errorMessage: null
    }
  },
  methods: {
    async inputUsername() {
      if (this.value === null || this.value.length === 0) {
        console.log("too short");
        this.showError("Username must be at least one character long.");
        return;
      }
      const response = await fetch(`/api/users/${this.value}`, {method: "GET"});
      if (await response.json()) {
        this.username = this.value;
        this.showingError = false;
      } else {
        this.showError(`@${this.value} does not exist`);
      }
    },
    async showError(message) {
      this.errorMessage = message;
      this.showingError = true;
      setTimeout(() => {  this.showingError = false; }, 3000);
    }
  }
};
</script>

<style scoped>
.other-profile {
  padding: 2em 5em 5em;
}
</style>
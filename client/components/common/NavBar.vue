<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="left">
      <img src="../../public/logo.svg">
      <h1 class="title">
        Fritter
      </h1>
    </div>
    <div class="right">
      <router-link
        to="/"
        :class="{current: $route.name === 'Home'}"
      >
        All Freets
      </router-link>
      <router-link
        to="/new-freet"
        v-if="$store.state.username"
        :class="{current: $route.name === 'New Freet'}"
      >
        New Freet
      </router-link>
      <router-link
        to="/following-feed"
        v-if="$store.state.username"
        :class="{current: $route.name === 'Following Feed'}"
      >
        Following Feed
      </router-link>
      <router-link
        to="/recommended-feed"
        v-if="$store.state.username"
        :class="{current: $route.name === 'Recommended Feed'}"
      >
        Recommended Feed
      </router-link>
      <router-link
        to="/other-profile"
        :class="{current: $route.name === 'Other Profile'}"
      >
        Other Profile
      </router-link>
      <router-link
        to="/my-profile"
        v-if="$store.state.username"
        :class="{current: $route.name === 'My Profile'}"
      >
        My Profile
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/account"
        :class="{current: $route.name === 'Account'}"
      >
        Account
      </router-link>
      <router-link
        v-else
        to="/login"
        :class="{current: $route.name === 'Login'}"
      >
        Login
      </router-link>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>
nav {
    padding: .5vw 2vw;
    background-color: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 32px;
}

.left {
	display: flex;
	align-items: center;
}

.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.right a {
    margin-left: 5px;
}

.alerts {
    width: 25%;
}

a {
  padding: .7em;
  border-radius: 10px;
  background-color: #9bf;
  color: #000;
  text-decoration: none;
}

.current{
  background-color: #48f;
  
}
</style>

<template>
  <div class="my-profile">
    <ProfileComponent
      :username="$store.state.username"
    />
  </div>
</template>

<script>
import ProfileComponent from '@/components/Profile/ProfileComponent.vue';

export default {
    name: 'MyProfile',
    components: {ProfileComponent}
};
</script>

<style scoped>
.my-profile {
  padding: 2em 5em 5em;
}
</style>
import Vue from 'vue';
import VueRouter from 'vue-router';
import FreetsPage from './components/Freet/FreetsPage.vue';
import CreateFreetForm from './components/Freet/CreateFreetForm.vue';
import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import FollowingFeed from './components/Follow/FollowingFeed.vue';
import RecommendedFeed from './components/Recommendations/RecommendedFeed.vue';
import ProfileSearch from './components/Profile/ProfileSearch.vue';
import MyProfile from './components/Profile/MyProfile.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: FreetsPage},
  {path: '/account', name: 'Account', component: AccountPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/new-freet', name: 'New Freet', component: CreateFreetForm},
  {path: '/following-feed', name: 'Following Feed', component: FollowingFeed},
  {path: '/recommended-feed', name: 'Recommended Feed', component: RecommendedFeed},
  {path: '/other-profile', name: 'Other Profile', component: ProfileSearch},
  {path: '/my-profile', name: 'My Profile', component: MyProfile},
  {path: '*', name: 'Not Found', component: NotFound}
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (to.name === 'Account' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to Account and are not signed in
      return;
    }

    if (to.name === 'New Freet' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to New Freet and are not signed in
      return;
    }

    if (to.name === 'Following Feed' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to Following Feed and are not signed in
      return;
    }

    if (to.name === 'Recommended Feed' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to Recommended Feed and are not signed in
      return;
    }

    if (to.name === 'My Profile' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to My Profile and are not signed in
      return;
    }
  }

  next();
});

export default router;

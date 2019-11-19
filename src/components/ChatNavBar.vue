<template>
  <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">
      Vue Chat
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-text>{{ user.name }} | </b-nav-text>
      <b-nav-item href="#" @click="onLogout" active>Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'ChatNavBar',
  data() {
    return {};
  },
  computed: {
    ...mapState(['user', 'reconnect']),
  },
  methods: {
    ...mapMutations(['setReconnect']),
    ...mapActions(['login', 'logout']),
    onLogout() {
      this.$router.push({ path: '/' });
      this.logout();
    },
    unload() {
      if (this.user.username) {
        // User hasn't logged out
        this.setReconnect(true);
      }
    },
  },
  created() {},
  mounted() {
    window.addEventListener('beforeunload', this.unload);
    if (this.reconnect) {
      this.login(this.user.usename);
    }
  },
};
</script>
<style lang="less" scoped>
.wrapper {
}
</style>

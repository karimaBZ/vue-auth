<template>
  <div id="app">
    <div id="nav">
      <span v-if="isLoggedIn">
        |
        <a @click="logout">Logout</a>
      </span>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
    },
  },
  created() {
    this.$http.interceptors.response.use(undefined,
      // eslint-disable-next-line func-names
      (err) => new Promise(function (resolve, reject) {
        console.log('TCL: created -> reject', reject);
        console.log('TCL: created -> resolve', resolve);
        // eslint-disable-next-line no-underscore-dangle
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.logout();
        }
        throw err;
      }));
  },
};
</script>

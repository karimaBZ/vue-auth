<template>
  <div id="app">
    <div id="nav" v-if="isLoggedIn">
      <md-button class="md-icon-button logout" @click="logout">
        <md-icon>logout</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>home</md-icon>
      </md-button>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn() {
      console.log('TCL: isLoggedIn -> this.$store.getters.isLoggedIn', this.$store.getters.isLoggedIn);
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
    this.$http.interceptors.response.use(
      // eslint-disable-next-line func-names
      (err) => new Promise(function (resolve, reject) {
        console.log('TCL: created -> reject', reject);
        console.log('TCL: created -> resolve', resolve);
        // eslint-disable-next-line no-underscore-dangle
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.logout();
        }
        throw err;
      }),
    );
  },
};
</script>
<style scoped>
.logout {
  float: right;
}
.md-card {
  width: 50%
}
.md-card-content {
  word-wrap: break-all;
}
</style>

<template>
  <div class="home">
    <md-card class="md-primary" md-theme="purple-card" md-with-hover>
      <md-ripple>
        <md-card-header>
          <div class="md-title">User</div>
          <div class="md-subhead">Access Token</div>
        </md-card-header>
        <md-card-content>
          {{accessToken}}
          <md-list class="md-triple-line">
            <md-list-item v-for="user in getUser" :key="user">
              <div class="md-list-item-text">
                <span>{{user.name}}</span>
                <span>{{user.email}}</span>
                <p>{{user.is_admin ? 'admin' : '-'}}</p>
              </div>
              <md-button class="md-icon-button md-list-action" v-if="!user.is_admin">
                <md-icon class="md-primary">delete</md-icon>
              </md-button>
            </md-list-item>
          </md-list>
        </md-card-content>
      </md-ripple>
    </md-card>
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src

// import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'login',
  computed: {
    accessToken() {
      return this.$store.getters.accessToken;
    },
    getUser() {
      return this.$store.getters.users;
    },
    // or we can use mapGetters
    // ...mapGetters(['accessToken']),
  },
  mounted() {
    this.$store.dispatch('getUsers');
  },
  // or we can use mapGetters
  // ...mapActions(['getUsers']), inside methods: {}
};
</script>
<style scoped>
.md-card-content {
  word-break: break-all;
}
.home {
  width: 50%;
}
</style>

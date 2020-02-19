<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="login">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Sign In</div>
        </md-card-header>
        <md-card-content>
          <md-field :class="messageClass">
            <md-input v-model="form.email" type="email" placeholder="Email" required />
            <!-- <span class="md-error">The email is required</span> -->
             <span class="md-error">{{isEmailValid()}}</span>
          </md-field>
          <md-field :class="messageClass">
            <md-input v-model="form.password" type="password" placeholder="Password" required />
            <span class="md-error">The password is required</span>
          </md-field>
          <md-switch v-model="hasMessages"></md-switch>
          <md-button class="md-primary" type="submit">Login</md-button>
          <a href="/register">Register</a>
          <md-progress-spinner md-mode="indeterminate" v-if="isLoading"></md-progress-spinner>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      // eslint-disable-next-line no-useless-escape
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      hasMessages: false,
    };
  },
  computed: {
    ...mapGetters(['isLoading']),
    messageClass() {
      return {
        'md-invalid': this.hasMessages,
      };
    },
  },
  methods: {
    login() {
      const { email } = this.form;
      const { password } = this.form;
      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/home'))
        .catch((err) => console.log(err));
    },
    isEmailValid() {
      // eslint-disable-next-line no-nested-ternary
      return (this.form.email === '') ? 'email is required' : (!this.reg.test(this.form.email)) ? 'email is not valid' : '';
    },
  },

};
</script>
<style scoped>
  .md-progress-bar {
    margin: 24px;
  }
</style>

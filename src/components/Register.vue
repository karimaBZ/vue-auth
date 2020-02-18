<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="register">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Register</div>
        </md-card-header>
        <md-card-content>
          <md-field :class="messageClass">
            <md-input id="name" type="text" v-model="name" placeholder="Name" required autofocus />
            <span class="md-error">The password is required</span>
          </md-field>
          <md-field :class="messageClass">
            <md-input id="email" type="email" v-model="email" placeholder="Email" required />
            <span class="md-error">{{isEmailValid()}}</span>
          </md-field>
          <md-field :class="messageClass">
            <md-input
              id="password"
              type="password"
              v-model="password"
              placeholder="Password"
              required
            />
            <span class="md-error">The password is required</span>
          </md-field>
          <md-field :class="messageClass">
            <md-input
              id="password-confirm"
              type="password"
              v-model="password_confirmation"
              placeholder="Confirm Password"
              required
            />
            <span class="md-error">The Confirm password is required</span>
          </md-field>
          <md-radio v-model="is_admin" :value="true">Admin</md-radio>
          <md-switch v-model="hasMessages"></md-switch>
          <md-button type="submit">Register</md-button>
           <a href="/login">Login</a>

        </md-card-content>
      </md-card>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      is_admin: null,
      hasMessages: false,
      // eslint-disable-next-line no-useless-escape
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  computed: {
    messageClass() {
      return {
        'md-invalid': this.hasMessages,
      };
    },
  },
  methods: {
    register() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin,
      };
      this.$store
        .dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err));
    },
    isEmailValid() {
      // eslint-disable-next-line no-nested-ternary
      return this.email === ''
        ? 'email is required'
        : !this.reg.test(this.email)
          ? 'email is not valid'
          : '';
    },
  },
};
</script>

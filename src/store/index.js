import Vue from 'vue';
import Vuex from 'vuex';
import authModule from '../modules/auth.module';

Vue.use(Vuex);
// const initialstate = {
//   status: '',
//   token: localStorage.getItem('token') || '',
//   user: {},
// };
export default new Vuex.Store({
  // state: initialstate,
  // mutations: {
  //   auth_request(state) {
  //     state.status = 'loading';
  //   },
  //   auth_success(state, token, user) {
  //     state.status = 'success';
  //     state.token = token;
  //     state.user = user;
  //   },
  //   auth_error(state) {
  //     state.status = 'error';
  //   },
  //   logout(state) {
  //     state.status = '';
  //     state.token = '';
  //   },
  // },
  // actions: {
  //   login({ commit }, user) {
  //     return new Promise((resolve, reject) => {
  //       commit('auth_request');
  //       axios({ url: 'http://localhost:3000/login', data: user, method: 'POST' })
  //         .then((resp) => {
  //           const { token } = resp.data;
  //           const { user: userResponse } = resp.data;
  //           localStorage.setItem('token', token);
  //           axios.defaults.headers.common.Authorization = token;
  //           commit('auth_success', token, userResponse);
  //           resolve(resp);
  //         })
  //         .catch((err) => {
  //           commit('auth_error');
  //           localStorage.removeItem('token');
  //           reject(err);
  //         });
  //     });
  //   },
  //   register({ commit }, user) {
  //     return new Promise((resolve, reject) => {
  //       commit('auth_request');
  //       axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
  //         .then((resp) => {
  //           const { token } = resp.data;
  //           const { user: userResponse } = resp.data;
  //           localStorage.setItem('token', token);
  //           axios.defaults.headers.common.Authorization = token;
  //           commit('auth_success', token, userResponse);
  //           resolve(resp);
  //         })
  //         .catch((err) => {
  //           commit('auth_error', err);
  //           localStorage.removeItem('token');
  //           reject(err);
  //         });
  //     });
  //   },
  //   logout({ commit }) {
  //     return new Promise((resolve, reject) => {
  //       console.log('TCL: logout -> reject', reject);
  //       commit('logout');
  //       localStorage.removeItem('token');
  //       delete axios.defaults.headers.common.Authorization;
  //       resolve();
  //     });
  //   },
  // },
  // getters: {
  //   isLoggedIn: (state) => !!state.token,
  //   authStatus: (state) => state.status,
  // },
  modules: {
    authModule,
  },
  // modules: {} we use modules when we separe mutations, state for different
});

import axios from 'axios';

const authModule = {
  state: {
    status: '',
    accessToken: localStorage.getItem('accessToken') || '',
    user: {},
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    register_request(state) {
      state.status = 'loading';
    },
    auth_success(state, accessToken) {
      state.status = 'success';
      state.accessToken = accessToken;
    },
    regester_success(state, user, accessToken) {
      state.status = 'success';
      state.accessToken = accessToken;
      state.user = user;
    },
    register_error(state) {
      state.status = 'error';
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.accessToken = '';
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({ url: 'http://localhost:3000/login', data: user, method: 'POST' })
          .then((resp) => {
            const { accessToken } = resp.data;
            localStorage.setItem('accessToken', accessToken);
            axios.defaults.headers.common.Authorization = accessToken;
            commit('auth_success', accessToken);
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error');
            localStorage.removeItem('accessToken');
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('register_request');
        axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
          .then((resp) => {
            const { accessToken } = resp.data;
            const userResponse = resp.config.data;
            localStorage.setItem('accessToken', accessToken);
            axios.defaults.headers.common.Authorization = accessToken;
            commit('regester_success', accessToken, userResponse);
            resolve(resp);
          })
          .catch((err) => {
            commit('regester_error', err);
            localStorage.removeItem('accessToken');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        console.log('TCL: logout -> reject', reject);
        commit('logout');
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common.Authorization;
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    authStatus: (state) => state.status,
    accessToken: (state) => state.accessToken,
    user: (state) => state.user,
  },
};
export default authModule;

import axios from 'axios';

const authModule = {
  state: {
    status: '',
    loading: false,
    accessToken: localStorage.getItem('accessToken') || '',
    user: {},
    users: [],
  },
  mutations: {
    auth_request(state) {
      state.loading = true;
    },
    get_users_request(state) {
      state.loading = true;
    },
    register_request(state) {
      state.loading = true;
    },
    auth_success(state, accessToken) {
      state.status = 'success';
      state.loading = false;
      state.accessToken = accessToken;
    },
    get_users_success(state, users) {
      state.status = 'success';
      state.loading = false;
      state.users = users;
    },
    register_success(state, user, accessToken) {
      state.status = 'success';
      state.loading = false;
      state.accessToken = accessToken;
      state.user = user;
    },
    register_error(state) {
      state.status = 'error';
    },
    auth_error(state) {
      state.status = 'error';
    },
    get_users_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.accessToken = '';
    },
  },
  actions: {
    getUsers({ commit }) {
      return new Promise((resolve, reject) => {
        commit('get_users_request');
        axios({ url: 'http://localhost:3000/users', method: 'GET' })
          .then((resp) => {
            console.log('TCL: getUser -> resp', resp);
            const { data } = resp;
            commit('get_users_success', data);
            resolve(resp);
          })
          .catch((err) => {
            commit('get_users_error');
            localStorage.removeItem('accessToken');
            reject(err);
          });
      });
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({ url: 'http://localhost:3000/login', data: user, method: 'POST' })
          .then((resp) => {
            const { accessToken } = resp.data;
            console.log('TCL: login -> resp', resp);
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
            commit('register_success', accessToken, userResponse);
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
    users: (state) => state.users,
    isLoading: (state) => state.loading,
  },
};
export default authModule;

import Vue from "vue";
import Vuex from "vuex";

import app from "./app";
import user from "./user";

//  数据加密
import SecureLS from "secure-ls";
import createPersistedState from "vuex-persistedstate";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userList: [
      {
        name: "joy",
        age: "123",
      },
    ],
  },
  mutations: {
    setUserInfo(state, val) {
      const { listIdx, data } = val;
      state.userList[listIdx] = data;
    },
  },
  actions: {},
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
      paths: [],
    }),
  ],
  modules: {
    app,
    user,
  },
});

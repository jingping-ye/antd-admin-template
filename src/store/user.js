/**
 * Title: user
 * Author: jingping.ye
 * Date: 2020-10-08 15:19:52
 * Description: 用户文档
 * LastModifiedDate:2020-10-08 15:19:52
 * LastModifiedDescription: 用户文档
 */
const state = {
  perms: [], // 用户权限标识集合
};

const getters = {};

const mutations = {
  setPerms(state, value) {
    state.perms = value;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

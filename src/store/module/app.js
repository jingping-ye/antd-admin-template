/**
 * Title: app
 * Author: jingping.ye
 * Date: 2020-11-28 22:59:09
 * Description: 整个页面所用缓存，包括布局
 * LastModifiedDate:2020-11-28 22:59:09
 * LastModifiedDescription: 全局数据存储
 */
const state = {
  isCollapsed: false,
};

const getters = {};

const mutations = {
  setIsCollapsed(state, val) {
    state.isCollapsed = val;
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

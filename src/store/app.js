/**
 * Title: app
 * Author: jingping.ye
 * Date: 2020-10-08 15:18:01
 * Description: App文档
 * LastModifiedDate:2020-10-08 15:18:01
 * LastModifiedDescription: 修改描述
 */
const state = {
  menuRouteLoaded: false, // 菜单和路由是否已经加载
};

const getters = {};

const mutations = {
  setMenuRouteLoaded(state, value) {
    state.menuRouteLoaded = value;
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

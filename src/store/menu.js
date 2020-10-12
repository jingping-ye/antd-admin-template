/**
 * Title: menu
 * Author: jingping.ye
 * Date: 2020-10-08 15:16:46
 * Description: Menu文档
 * LastModifiedDate:2020-10-08 15:16:46
 * LastModifiedDescription: 修改描述
 */
const state = {
  menuList: [], // 导航菜单树
};

const getters = {};

const mutations = {
  setMenuList(state, value) {
    state.menuList = value;
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

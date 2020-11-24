/**
 * Title: app
 * Author: jingping.ye
 * Date: 2020-10-08 15:18:01
 * Description: 应用级vuex
 * LastModifiedDate:2020-10-08 15:18:01
 * LastModifiedDescription: 修改描述
 */
const state = {
  menuList: [], // 菜单列表
  tagList: [], // 标签列表
  selectedTag: "UserManage1", // 选中的标签
};

const getters = {};

const mutations = {
  setMenuList(state, value) {
    state.menuList = value;
  },
  setTagList(state, value) {
    state.tagList = value;
  },
  setSelectedTag(state, value) {
    state.selectedTag = value;
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

import { Menu } from "ant-design-vue";
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners" v-if="!menuInfo.meta.hide">
        <span slot="title" v-if="menuInfo.meta" >
          <template v-if="route.meta.icon">
              <svg-icon
                :name="route.meta.icon"
                v-if="isExternalIcon(route.meta.icon)"
                class="external-icon selected"
              ></svg-icon>
              <a-icon :type="route.meta.icon" v-else />
            </template>
          <span>{{ menuInfo.meta.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.meta.hide" :key="comPath(item.path)">
            <router-link :to="{path:comPath(item.path)}">
              <template v-if="route.meta.icon">
                <svg-icon
                  :name="route.meta.icon"
                  v-if="isExternalIcon(route.meta.icon)"
                  class="external-icon selected"
                ></svg-icon>
                <a-icon :type="route.meta.icon" v-else />
              </template>
              <span>{{ item.meta.title }}</span>
            </router-link>
          </a-menu-item>
          <sub-menu 
            v-else 
            :menu-info="item" 
            :baseUrl="comPath(item.path)"/>
        </template>
      </a-sub-menu>
    `,
  name: "SubMenu",
  isSubMenu: true,
  methods: {
    isExternalIcon(iconName) {
      const svgIcon = this.$autoRegister.svgIcon;
      return svgIcon.includes(iconName);
    },
    getHide(menuInfo) {
      //  getHide
      console.log("menuInfo", menuInfo);
      return true;
    },
    comPath(path) {
      if (path.startsWith("/")) {
        return path;
      } else {
        return `${this.baseUrl}/${path}`;
      }
    },
    /***
     * 判断是否无显示的子路由
     */
    isHasNoShowChild(children) {
      console.log("children", children);
      if (!children) {
        return true;
      }

      const showChildRoute = children.filter((item) => !(item.meta && item.meta.hide));
      if (showChildRoute.length === 0) {
        return true;
      }

      return false;
    },
  },
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
    baseUrl: {
      type: String,
      default: "",
    },
  },
};

export default SubMenu;

import { Menu } from "ant-design-vue";
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.name" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.meta.icon" v-if="menuInfo.meta.icon" /><span>{{ menuInfo.meta.title }}</span>
        </span>
        <template v-for="route in menuInfo.children">
          <a-menu-item v-if="!isHasValidChildren(route.children)" :key="route.name">
            <router-link :to="{path: comPath(route.path)}">
              <a-icon :type="route.meta.icon" v-if="route.meta.icon"/>
              <span>{{ route.meta.title }}</span>
            </router-link>
          </a-menu-item>
          <sub-menu v-else :key="route.name" :menu-info="route" :baseUrl="comPath(route.path)" />
        </template>
      </a-sub-menu>
    `,
  name: "SubMenu",
  isSubMenu: true,
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
  methods: {
    comPath(path) {
      if (path.startsWith("/")) {
        return path;
      } else {
        return `${this.baseUrl}/${path}`;
      }
    },
    isHasValidChildren(children) {
      if (children && children.length > 0) {
        const showRoute = children.filter((item) => !(item.meta && item.meta.hide));
        if (showRoute.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
};
export default SubMenu;

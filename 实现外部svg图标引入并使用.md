# 实现外部svg图标引入并使用

## 1. 安装依赖

```js
npm i svg-sprite-loader svgo svgo-loader -D
```

## 2. 编写SvgIcon组件

```vue
<!-- /src/SvgIcon/SvgIcon.vue-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    src: {
      type: String,
      required: true,
    },
    className: {
      type: String,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.src}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

```

| 属性 | 说明     | 类型   | 可选值 | 默认值 |
| ---- | -------- | ------ | ------ | ------ |
| name | 图标名称 | Stirng | -      | -      |

## 3. 编写自动注册文件

> 在这里可以设置需要扫描svg图标和全局组件的目录。
>
> 如下的`@/assets/icons`和`@/components/`及分别是svg图标和全局组件的扫描目录。因此，如果有图标，图标应该放置在`@/assets/icons`目录下。

```js
//   /src/autoRegister.js
import Vue from "vue";

let svgIcon = [];
let globalComp = [];

// 自动注册Svg图标
const scanAllSvgIconFunc = require.context("@/assets/icons/", false, /\.svg$/);
scanAllSvgIconFunc.keys().forEach((svgIconPath) => {
  const icon = scanAllSvgIconFunc(svgIconPath);
  const iconName = icon.default.id.replace("icon-", "");
  svgIcon.push(iconName);
  return icon;
});

// 自动注册Vue全局组件
const scanAllGlobalCompFunc = require.context("@/components/", true, /\.vue$/);
scanAllGlobalCompFunc.keys().forEach((singleCompPath) => {
  const comp = scanAllGlobalCompFunc(singleCompPath);
  Vue.component(comp.default.name, comp.default);
  globalComp.push(comp.default.name);
});

export { svgIcon, globalComp };
```

## 4. 在`main.js`中引入自动注册文件

```js
import * as autoRegister from "./autoRegister";
Vue.prototype.$autoRegister = autoRegister;
```

## 5. 应用

> 此处我们以侧边栏菜单为例
>
> 修改范围为`src/layouts/LSidebar.vue`被`src/layouts/LSidebarItem.js`

### 5.1  需要icon的地方加上判断，支持外部的svg-icon

```js
<template v-if="route.meta.icon">
    <svg-icon
      :name="route.meta.icon"
      v-if="isExternalIcon(route.meta.icon)"
      class="external-icon selected"
    ></svg-icon>
    <a-icon :type="route.meta.icon" v-else />
  </template>
```

### 5.2 判断是否是外部图标

```js
methods:{
   isExternalIcon(iconName) {
      const svgIcon = this.$autoRegister.svgIcon;
      return svgIcon.includes(iconName);
    },
}
```

### 5.3 设置图标相关样式

```js
<style lang="scss" scoped>
.external-icon {
  margin-right: 10px;
}
.ant-menu-item-selected .selected {
  color: #e9b242;
}
</style>
```




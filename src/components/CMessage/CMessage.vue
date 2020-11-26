<template>
  <div class="c-message">
    <transition name="slide">
      <div class="message-wrap" :class="type" v-if="visible">
        <div class="content">{{ content }}</div>
      </div>
    </transition>
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };

//  引入外部资源
// import someThing from 'SomeThing';
export default {
  name: "CMessage",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      //  常量
      value,
      //  状态
      flag: true,
      //  变量
      content: "",
      visible: false,
      type: "info", // success/error/info/warning
    };
  },
  computed: {},
  watch: {},
  methods: {
    startTimer() {
      setTimeout(() => {
        this.visible = false;
      }, 3000);
    },
  },
  filters: {},
  created() {},
  mounted() {
    this.startTimer();
  },
  destoryed() {},
};
</script>
<style lang="scss" scoped>
.c-message {
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  transition: all 0.2s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

// 消息样式
.error {
  background: #fef0f0;
  color: #f56c6c;
}
.success {
  background-color: #f0f9eb;
  color: #67c23a;
}
.message-wrap {
  position: fixed;
  background-color: #44b0f3;
  color: #fff;
  left: 40%;
  width: 20%;
  top: 25px;
  height: 40px;
  z-index: 1001;
  border-radius: 4px;
  text-align: center;
  .content {
    line-height: 40px;
  }
}
</style>

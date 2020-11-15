import Vue from "vue";
import CMessage from "./CMessage.vue";
// const MessageBox = Vue.extend(CMessage);
// const Message = {
//   install: (options = "", type, duration) => {
//     let instance = new MessageBox({
//       data: options,
//     }).$mount();
//     document.body.appendChild(instance.$el);
//     Vue.nextTick(() => {
//       instance.visible = true;
//     });
//   },
// };

// Vue.prototype.$message = Message.install;
// ["success", "error"].forEach((type) => {
//   Vue.prototype.$cMessage[type](content, type);
// });

const MessageConstructor = Vue.extend(CMessage);

const Message = {
  install: (Vue, options) => {
    const messageInstance = new MessageConstructor({
      data: options,
    }).$mount();
    document.body.appendChild(messageInstance.$el);
    // Vue.prototype.$cMessage
  },
};
export default Message;

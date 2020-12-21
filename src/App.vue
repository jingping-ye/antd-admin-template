<template>
  <div id="app">
    <router-view />
    <DebuggerArea />
  </div>
</template>
<script>
import DebuggerArea from "@/components/DebuggerArea/DebuggerArea.vue";
export default {
  name: "App",
  components: {
    DebuggerArea,
  },
};
</script>

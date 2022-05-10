<template>
  <a-card>
    <header style="background: #00000008">
      <tags-filled style="color: #DC3545; font-size: medium"></tags-filled>
      <span style="padding-left: 10px; font-weight: bold; font-size: 14px">Log Sink</span>
    </header>
  </a-card>
</template>

<script>
import {defineComponent} from 'vue';
import {TagsFilled} from '@ant-design/icons-vue';

export default defineComponent({
  name: "LogSink",
  components: {
    TagsFilled
  }
})
</script>

<style scoped>

</style>
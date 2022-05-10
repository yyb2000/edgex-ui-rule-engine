<template>
  <a-card>
    <a-button :size="'small'" style="background: #6C757D; padding: 0 5px; border-radius: 5px" @click="addSinkTransfer">
      <template #icon><plus-circle-filled style="color: white" /></template>
      <span style="font-weight: bold; color: white;">Add Sink</span>
    </a-button>
    <log-sink></log-sink>
  </a-card>

</template>

<script>
import {defineComponent} from 'vue';
import {PlusCircleFilled} from '@ant-design/icons-vue';
import LogSink from "@/components/sinks/LogSink";

export default defineComponent({
  name: "SinkList",
  components: {
    LogSink,
    PlusCircleFilled
  }
})
</script>

<style scoped>

</style>
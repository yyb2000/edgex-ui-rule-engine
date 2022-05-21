<template>
  <a-card>
    <a-button :size="'small'" style="background: #6C757D; padding: 0 5px; border-radius: 5px" @click="addSinkTransfer">
      <template #icon><plus-circle-filled style="color: white" /></template>
      <span style="font-weight: bold; color: white;">Add Sink</span>
    </a-button>
  </a-card>

  <div class="card-header" style="background: #00000008; height: 44px">
    <div v-if="addOrEdit.isAdd">
      <span style="font-weight: bold; font-size: 15px">
      <plus-outlined style="color: #17A2B8; padding-left: 17px; padding-top: 10px; font-size: large"/>
      Add Sink
    </span>
    </div>

  </div>

  <a-card>
    <a-form
        :model="sinkType"
        name="sinkType"
    >
      <a-form-item>
        <template #label>
          <span style="margin-right: 10px">Sink Type</span>
        </template>
        <a-select v-model:value="sinkType.selectedSinkType">
          <a-select-option value="log">log</a-select-option>
          <a-select-option value="mqqt">mqqt</a-select-option>
          <a-select-option value="nop">nop</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>

    <div v-if="sinkType.selectedSinkType==='log'">
      <log-sink></log-sink>
    </div>
    <div v-else-if="sinkType.selectedSinkType==='mqqt'">
      <mqqt-sink></mqqt-sink>
    </div>
    <div v-else-if="sinkType.selectedSinkType==='nop'">
      <nop-sink></nop-sink>
    </div>
  </a-card>

</template>

<script>
import {defineComponent, reactive} from 'vue';
import {PlusCircleFilled, PlusOutlined} from '@ant-design/icons-vue';
import LogSink from "@/components/sinks/LogSink";
import MqqtSink from "@/components/sinks/MqqtSink";
import NopSink from "@/components/sinks/NopSink";

export default defineComponent({
  name: "SinkList",
  components: {
    NopSink,
    MqqtSink,
    LogSink,
    PlusCircleFilled,
    PlusOutlined,
  },
  setup(){
    const addOrEdit = reactive({
      isAdd: true,
      isEdit: false
    });
    const sinkType = reactive({
      selectedSinkType: ''
    });
    return {
      sinkType,
      addOrEdit
    }
  }
})
</script>

<style scoped>

</style>
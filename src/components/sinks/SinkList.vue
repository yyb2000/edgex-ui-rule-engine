<template>
  <a-card>
    <div v-if="!adding">
      <a-button :size="'small'" style="background: #6C757D; padding: 0 5px; border-radius: 5px" @click="addSinkTransfer">
        <template #icon><plus-circle-filled style="color: white" /></template>
        <span style="font-weight: bold; color: white;">Add Sink</span>
      </a-button>
    </div>

    <div v-else>
      <div v-if="addOrEdit.isAdd">
        <b-card-header>
          <span style="font-size: 15px; font-weight: bold">
            <plus-outlined style="color: #17A2B8; padding-top: 10px; font-size: large"/>
            Add Sink
            <a-button :size="'small'" style="background: #6C757D; border-radius: 4px; font-size: 10px; color: white; float: right" @click="addSinkTransfer">Cancel</a-button>
            <a-button :size="'small'" style="background: #28A745; border-radius: 4px; font-size: 10px; color: white; float: right" @click="addSink">Add</a-button>
          </span>
        </b-card-header>

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
      </div>

    </div>


  </a-card>

</template>

<script>
import {defineComponent, reactive} from 'vue';
import {PlusCircleFilled, PlusOutlined} from '@ant-design/icons-vue';
import LogSink from "@/components/sinks/LogSink";
import MqqtSink from "@/components/sinks/MqqtSink";
import NopSink from "@/components/sinks/NopSink";

let adding = false

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
  },
  data() {
    return {
      adding,
      MQTT_SINK: "mqtt",
      LOG_SINK: "log",
      NOP_SINK: "nop",
    }
  },
  methods: {
    addSinkTransfer() {
      let that = this
      if (that.adding) {
        console.log(that.adding)
        that.adding = false
        console.log(that.adding)
      }
      else if (!that.adding) {
        console.log(that.adding)
        that.adding = true
        console.log(that.adding)
      }
    }
  }
})
</script>

<style scoped>

</style>
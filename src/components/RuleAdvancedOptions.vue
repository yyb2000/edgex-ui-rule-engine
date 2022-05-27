<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel key="1" :show-arrow="false">
      <template #header>
        <div>
          <a-button style="border: none; background: none" @click="collapseToggle">
            <template #icon><tags-filled style="color: #007BFF; font-size: large"/></template>
            <span style="font-weight: bold; font-size: 15px; color: #007BFF">
              Rule Advanced Options
            </span>
            <i aria-disabled="true" v-if="!collapseToggleStatus">
              <caret-down-outlined style="color: #007BFF; font-size: large; padding-left: 5px"/>
            </i>
            <i aria-disabled="true" v-else-if="collapseToggleStatus">
              <caret-up-outlined style="color: #007BFF; font-size: large; padding-left: 5px"/>
            </i>
          </a-button>
        </div>
      </template>
      <a-card >
        <a-form
            :model="ruleOptions"
            name="advanced"
        >

          <a-form-item name="isEventTime">
            <template #label>
              <span style="margin-right: 10px">IsEventTime</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Whether to use event time or processing time as the timestamp for an event. If event time is used, the timestamp will be extracted from the payload. The timestamp filed must be specified by the stream definition.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-select v-model:value="ruleOptions.isEventTime">
              <a-select-option value="false">false</a-select-option>
              <a-select-option value="true">true</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item name="qos">
            <template #label>
              <span style="margin-right: 10px">Qos</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Specify the qos of the stream. The options are 0: At most once; 1: At least once and 2: Exactly once. If qos is bigger than 0, the checkpoint mechanism will be activated to save states periodically so that the rule can be resumed from errors.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-select v-model:value="ruleOptions.qos">
              <a-select-option value=0>0</a-select-option>
              <a-select-option value=1>1</a-select-option>
              <a-select-option value=2>2</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item name="lateTolerance">
            <template #label>
              <span style="margin-right: 10px">LateTolerance</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">When working with event-time windowing, it can happen that elements arrive late. LateTolerance can specify by how much time(unit is millisecond) elements can be late before they are dropped. By default, the value is 0 which means late elements are dropped.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-input v-model:value="ruleOptions.lateTolerance" type="number"></a-input>
          </a-form-item>

          <a-form-item name="concurrency">
            <template #label>
              <span style="margin-right: 10px">Concurrency</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">A rule is processed by several phases of plans according to the sql statement. This option will specify how many instances will be run for each plan. If the value is bigger than 1, the order of the messages may not be retained.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-input v-model:value="ruleOptions.concurrency" type="number"></a-input>
          </a-form-item>

          <a-form-item name="bufferLength">
            <template #label>
              <span style="margin-right: 10px">BufferLength</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Specify how many messages can be buffered in memory for each plan. If the buffered messages exceed the limit, the plan will block message receiving until the buffered messages have been sent out so that the buffered size is less than the limit. A bigger value will accommodate more throughput but will also take up more memory footprint.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-input v-model:value="ruleOptions.bufferLength" type="number"></a-input>
          </a-form-item>

          <a-form-item name="checkpointInterval">
            <template #label>
              <span style="margin-right: 10px">CheckpointInterval</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Specify the time interval in milliseconds to trigger a checkpoint. This is only effective when qos is bigger than 0.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-input v-model:value="ruleOptions.checkpointInterval" type="number"></a-input>
          </a-form-item>

          <a-form-item name="sendMetaToSink">
            <template #label>
              <span style="margin-right: 10px">SendMetaToSink</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Specify whether the meta data of an event will be sent to the sink. If true, the sink can get te meta data information.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-select v-model:value="ruleOptions.sendMetaToSink">
              <a-select-option value="false">false</a-select-option>
              <a-select-option value="true">true</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item name="sendError">
            <template #label>
              <span style="margin-right: 10px">SendError</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Whether to send the error to sink. If true, any runtime error will be sent through the whole rule into sinks. Otherwise, the error will only be printed out in the log.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-select v-model:value="ruleOptions.sendError">
              <a-select-option value="false">false</a-select-option>
              <a-select-option value="true">true</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-card>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {TagsFilled, QuestionCircleOutlined,CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons-vue';

export default defineComponent({
  name: "RuleAdvancedOptions",
  components: {
    TagsFilled,
    QuestionCircleOutlined,
    CaretDownOutlined,
    CaretUpOutlined,
  },
  setup(){
    const activeKey = ref([]);
    const ruleOptions = reactive({
      //TODO
      // iseventtime传值前将str转为Boolean
      isEventTime: 'false',
      qos: 0,
      lateTolerance: '',
      concurrency: '',
      bufferLength: '',
      checkpointInterval: '',
      sendMetaToSink: 'false',
      sendError: 'true'
    });
    let collapseToggleStatus = false;
    return {
      ruleOptions,
      collapseToggleStatus,
      activeKey
    }
  },
  methods: {
    collapseToggle() {
      if (this.collapseToggleStatus) {
        this.collapseToggleStatus = false //close
        return
      }
      this.collapseToggleStatus = true //open
    }
  }
})
</script>

<style scoped>

</style>
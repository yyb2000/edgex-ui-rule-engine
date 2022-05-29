<template>
  <header style="background: #00000008; line-height: 43px;">
    <tags-filled style="color: #DC3545; font-size: medium; padding-left: 15px"></tags-filled>
    <span style="padding-left: 10px; font-weight: bold; font-size: 14px">Log Sink</span>
  </header>
  <a-card>
    <info-circle-filled style="color: #17A2B8"/>
    <span style="color: #17A2B8">
      The action is used for print output message into log file, the log file is at $eKuiper_install/log/stream.log by default.
      <br>
      No properties can be specified for the action.
    </span>

    <a-form
        :model="logSink"
        name="log"
        style="padding-top: 10px"
    >

      <a-form-item name="sendSingle">
        <template #label>
          <span style="margin-right: 10px">sendSingle</span>
          <a-popover title="format tips" trigger="hover" placement="right">
            <template #content>
              <p style="width: 274px">The output messages are received as an array. This is indicate whether to send the results one by one. If false, the output message will be {"result":"${the string of received message}"}. For example, {"result":"[{\"count\":30},"\"count\":20}]"}. Otherwise, the result message will be sent one by one with the actual field name. For the same example as above, it will send {"count":30}, then send {"count":20} to the RESTful endpoint.Default to false.</p>
            </template>
            <question-circle-outlined style="font-size: medium"/>
          </a-popover>
        </template>
        <a-select v-model:value="logSink.sendSingle">
          <a-select-option value="false">false</a-select-option>
          <a-select-option value="true">true</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item name="dataTemplate">
        <template #label>
          <span style="margin-right: 10px">dataTemplate</span>
        </template>
        <a-input v-model:value="logSink.dataTemplate" type="text"></a-input>
      </a-form-item>

      <a-form-item
          name="sinkBaseProperties"

      >
        <template #label>
          <span style="margin-right: 10px">Options</span>
          <a-popover title="tips" trigger="hover" placement="right">
            <template #content>
              <p style="width: 274px">Advanced Options</p>
            </template>
            <question-circle-outlined style="font-size: large"/>
          </a-popover>
        </template>
        <a-button type="primary" @click="logSinkBaseProperty">Primary Button</a-button>
        <sink-base-properties
            v-model:sinkBaseProperties="sinkBaseProperties"
        >
        </sink-base-properties>
<!--        TODO-->
<!--        onSinkBasePropertiesChange(sinkBaseProperties: SinkBaseProperties) {-->
<!--          Object.assign(this.logSink, sinkBaseProperties)-->
<!--        }-->
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import {defineComponent, reactive} from 'vue';
import {TagsFilled, InfoCircleFilled, QuestionCircleOutlined} from '@ant-design/icons-vue';
import SinkBaseProperties from "@/components/sinks/SinkBaseProperties";

export default defineComponent({
  name: "LogSink",
  components: {
    SinkBaseProperties,
    TagsFilled,
    InfoCircleFilled,
    QuestionCircleOutlined
  },
  setup(){
    const logSink = reactive({
      //TODO
      // sendSingle传值前将str转为Boolean
      sendSingle: 'false',
      dataTemplate: ''
    });
    const sinkBaseProperties = reactive({
      concurrency: 1,
      bufferLength: 1024,
      retryInterval: 1000,
      retryCount: 0,
      cacheLength: 1024,
      cacheSaveInterval: 1000,
      runAsync: false,
      omitIfEmpty: false
    });
    return {
      logSink,
      sinkBaseProperties,
    }
  },
  methods: {
    logSinkBaseProperty(){
      console.log(this.sinkBaseProperties)
      console.log(this.sinkBaseProperties.concurrency)
    }
  }
})

</script>

<style scoped>

</style>
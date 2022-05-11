<template>
  <header style="background: #00000008; line-height: 43px;">
    <tags-filled style="color: #DC3545; font-size: medium; padding-left: 15px"></tags-filled>
    <span style="padding-left: 10px; font-weight: bold; font-size: 14px">Nop Sink</span>
  </header>
  <a-card>
    <a-form
        :model="nopSink"
        name="nop"
    >

      <a-form-item name="log">
        <template #label>
          <span style="margin-right: 10px">Log</span>
          <a-popover title="format tips" trigger="hover" placement="right">
            <template #content>
              <p style="width: 274px">print the sink result to log or not. By default is false, that will not print the result to log file.</p>
            </template>
            <question-circle-outlined style="font-size: medium"/>
          </a-popover>
        </template>
        <a-select v-model:value="nopSink.log">
          <a-select-option value="false">false</a-select-option>
          <a-select-option value="true">true</a-select-option>
        </a-select>
      </a-form-item>

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
        <a-select v-model:value="nopSink.sendSingle">
          <a-select-option value="false">false</a-select-option>
          <a-select-option value="true">true</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item name="dataTemplate">
        <template #label>
          <span style="margin-right: 10px">dataTemplate</span>
        </template>
        <a-input v-model:value="nopSink.dataTemplate" type="text"></a-input>
      </a-form-item>

      <a-form-item
          name="sinkBaseProperties"
      >
        <template #label>
          <span style="margin-right: 10px">Advances Options</span>
        </template>
        <sink-base-properties></sink-base-properties>
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
import {TagsFilled, QuestionCircleOutlined} from '@ant-design/icons-vue';
import SinkBaseProperties from "@/components/sinks/SinkBaseProperties";
export default defineComponent({
  name: "NopSink",
  components: {
    SinkBaseProperties,
    TagsFilled,
    QuestionCircleOutlined
  },
  setup(){
    const nopSink = reactive({
      //TODO
      // 传值前将str转为Boolean
      log: 'false',
      sendSingle: 'false',
      dataTemplate: ''
    });
    return {
      nopSink
    }
  }
})

</script>

<style scoped>

</style>
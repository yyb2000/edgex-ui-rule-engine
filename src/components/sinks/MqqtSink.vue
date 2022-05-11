<template>
  <header style="background: #00000008; line-height: 43px;">
    <tags-filled style="color: #DC3545; font-size: medium; padding-left: 15px"></tags-filled>
    <span style="padding-left: 10px; font-weight: bold; font-size: 14px">MQQT Sink</span>
  </header>
  <a-card>
    <a-form
        :model="MQQTSink"
        name="mqqt"
    >

      <a-form-item name="server" :rules="[{required: true, message: 'the mqtt server address can\'t be empty!'}]">
        <template #label>
          <span style="margin-right: 10px">Server</span>
        </template>
        <a-input v-model:value="MQQTSink.server"></a-input>
      </a-form-item>

      <a-form-item name="topic" :rules="[{required: true, message: 'the topic can\'t be empty!'}]">
        <template #label>
          <span style="margin-right: 10px">Topic</span>
        </template>
        <a-input v-model:value="MQQTSink.topic"></a-input>
      </a-form-item>

      <a-form-item name="clientId">
        <template #label>
          <span style="margin-right: 10px">ClientId</span>
        </template>
        <a-input v-model:value="MQQTSink.clientId"></a-input>
      </a-form-item>

      <a-form-item name="protocolVersion">
        <template #label>
          <span style="margin-right: 10px">ProtocolVersion</span>
        </template>
        <a-select v-model:value="MQQTSink.protocolVersion">
          <a-select-option value=3.1>3.1</a-select-option>
          <a-select-option value=3.1.1>3.1.1</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item name="qos">
        <template #label>
          <span style="margin-right: 10px">Qos</span>
        </template>
        <a-select v-model:value="MQQTSink.qos">
          <a-select-option value=0>0</a-select-option>
          <a-select-option value=1>1</a-select-option>
          <a-select-option value=2>2</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item name="username">
        <template #label>
          <span style="margin-right: 10px">Username</span>
        </template>
        <a-input v-model:value="MQQTSink.username"></a-input>
      </a-form-item>

      <a-form-item name="password">
        <template #label>
          <span style="margin-right: 10px">Password</span>
        </template>
        <a-input v-model:value="MQQTSink.password"></a-input>
      </a-form-item>

      <a-form-item name="retained">
        <template #label>
          <span style="margin-right: 10px">Retained</span>
        </template>
        <a-select v-model:value="MQQTSink.retained">
          <a-select-option value=3.1>3.1</a-select-option>
          <a-select-option value=3.1.1>3.1.1</a-select-option>
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
        <a-select v-model:value="MQQTSink.sendSingle">
          <a-select-option value="false">false</a-select-option>
          <a-select-option value="true">true</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item name="dataTemplate">
        <template #label>
          <span style="margin-right: 10px">DataTemplate</span>
        </template>
        <a-input v-model:value="MQQTSink.dataTemplate"></a-input>
      </a-form-item>

      <a-form-item name="insecureSkipVerify">
        <template #label>
          <span style="margin-right: 10px">InsecureSkipVerify</span>
        </template>
        <a-select v-model:value="MQQTSink.insecureSkipVerify">
          <a-select-option value="true">true</a-select-option>
          <a-select-option value="false">false</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item name="certificationPath">
        <template #label>
          <span style="margin-right: 10px">CertificationPath</span>
        </template>
        <a-input v-model:value="MQQTSink.certificationPath"></a-input>
      </a-form-item>

      <a-form-item name="privateKeyPath">
        <template #label>
          <span style="margin-right: 10px">PrivateKeyPath</span>
        </template>
        <a-input v-model:value="MQQTSink.privateKeyPath"></a-input>
      </a-form-item>

      <a-form-item name="rootCaPath">
        <template #label>
          <span style="margin-right: 10px">RootCaPath</span>
        </template>
        <a-input v-model:value="MQQTSink.rootCaPath"></a-input>
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
  name: "MqqtSink",
  components: {
    SinkBaseProperties,
    TagsFilled,
    QuestionCircleOutlined
  },
  setup(){
    const MQQTSink = reactive({
      //TODO
      // 传值前将str转为Boolean
      server: 'tcp://127.0.0.1:1883',
      topic: '',
      clientId: '',
      protocolVersion: '3.1',
      qos: 0,
      username: '',
      password: '',
      dataTemplate: '',
      insecureSkipVerify: 'true',
      retained: 'false',
      sendSingle: 'false',
      certificationPath: '',
      privateKeyPath: '',
      rootCaPath: '',
    });
    return {
      MQQTSink
    }
  }
})

</script>

<style scoped>

</style>
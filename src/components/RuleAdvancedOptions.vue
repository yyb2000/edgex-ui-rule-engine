<template>
  <div class="card-header" style="background: #00000008; height: 44px" aria-controls="collapse-rule-opts">
    <a-button style="border: none; background: none" @click="collapseToggle">
      <template #icon><tags-filled style="color: #007BFF; padding-left: 10px; padding-top: 10px; font-size: large"/></template>
      <span style="font-weight: bold; font-size: 15px; color: #007BFF">
        Rule Advanced Options
      </span>
    </a-button>
  </div>

  <a-card id="collapse-rule-opts">
    <a-form
      :model="advancedForm"
      name="advanced"
    >

      <a-form-item
          name="eventTime"
      >
        <template #label>
          <span style="margin-right: 10px">IsEventTime</span>
          <a-popover title="format tips" trigger="hover" placement="right">
            <template #content>
              <p style="width: 274px">Whether to use event time or processing time as the timestamp for an event. If event time is used, the timestamp will be extracted from the payload. The timestamp filed must be specified by the stream definition.</p>
            </template>
            <question-circle-outlined style="font-size: large"/>
          </a-popover>
        </template>
        <a-input v-model:value="ruleOptions.isEventTime"></a-input>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import {defineComponent, reactive} from 'vue';
import {TagsFilled, QuestionCircleOutlined} from '@ant-design/icons-vue';

export default defineComponent({
  name: "RuleAdvancedOptions",
  components: {
    TagsFilled,
    QuestionCircleOutlined
  },
  setup(){
    const ruleOptions = reactive({
      isEventTime: 'false'
    });

    return {
      ruleOptions
    }
  }
})
</script>

<style scoped>

</style>
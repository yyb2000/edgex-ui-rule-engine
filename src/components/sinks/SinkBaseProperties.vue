<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel key="1" :show-arrow="false">
      <template #header>
        <div class="card-header" style="background:none;">
          <a-button style="border: none; background: none" @click="collapseToggle">
            <template #icon><tags-filled style="color: #007BFF; font-size: large"/></template>
            <span style="font-size: 15px; color: #007BFF">
              Sink Advanced Options
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
<!--        :model="sinkBaseProperties"-->
        <a-form
            name="advanced"
            :value="sinkBaseProperties"

        >

          <a-form-item name="concurrency">
            <template #label>
              <span style="margin-right: 10px">Concurrency</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Specify how many instances of the sink will be run. If the value is bigger than 1, the order of the messages may not be retained.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
<!--            <a-input v-model:value="sinkBaseProperties.concurrency" type="number"></a-input>-->
            <a-input :value="sinkBaseProperties.concurrency" type="number" @input="changeValConcurrency"></a-input>

          </a-form-item>

          <a-form-item name="bufferLength">
            <template #label>
              <span style="margin-right: 10px">BufferLength</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Specify how many messages can be buffered in memory. If the buffered messages exceed the limit, the sink will block message receiving until the buffered messages have been sent out so that the buffered size is less than the limit.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-input :value="sinkBaseProperties.bufferLength" type="number" @input="changeValbufferLength"></a-input>
          </a-form-item>

          <a-form-item name="retryInterval">
            <template #label>
              <span style="margin-right: 10px">RetryInterval</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Specify how many milliseconds will the sink retry to send data out if the previous send failed. If the specified value &lt;= 0, then it will not retry.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-input :value="sinkBaseProperties.retryInterval" type="number" @input="changeValretryInterval"></a-input>
          </a-form-item>

          <a-form-item name="retryCount">
            <template #label>
              <span style="margin-right: 10px">RetryCount</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Specify how many will the sink retry to send data out if the previous send failed. If the specified value &lt;= 0, then it will not retry.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-input :value="sinkBaseProperties.retryCount" type="number" @input="changeValretryCount"></a-input>
          </a-form-item>

          <a-form-item name="cacheLength">
            <template #label>
              <span style="margin-right: 10px">CacheLength</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Specify how many messages can be cached. The cached messages will be resent to external system until the data sent out successfully. The cached message will be sent in order except in runAsync or concurrent mode. The cached message will be saved to disk in fixed intervals.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-input :value="sinkBaseProperties.cacheLength" type="number" @input="changeValcacheLength"></a-input>
          </a-form-item>

          <a-form-item name="cacheSaveInterval">
            <template #label>
              <span style="margin-right: 10px">CacheSaveInterval</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Specify the interval to save cached message to the disk. Notice that, if the rule is closed in plan, all the cached messages will be saved at close. A larger value can reduce the saving overhead but may lose more cache messages when the system is interrupted in error.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-input :value="sinkBaseProperties.cacheSaveInterval" type="number" @input="changeValcacheSaveInterval"></a-input>
          </a-form-item>


          <a-form-item name="runAsync">
            <template #label>
              <span style="margin-right: 10px">RunAsync</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">Whether the sink will run asynchronously for better performance. If it is true, the sink result order is not promised.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-select :value="sinkBaseProperties.runAsync" @change="changeValrunAsync">
              <a-select-option value="false">false</a-select-option>
              <a-select-option value="true">true</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item name="omitIfEmpty">
            <template #label>
              <span style="margin-right: 10px">OmitIfEmpty</span>
              <a-popover title="format tips" trigger="hover" placement="right">
                <template #content>
                  <p style="width: 274px">If the configuration item is set to true, when SELECT result is empty, then the result will not feed to sink operator.</p>
                </template>
                <question-circle-outlined style="font-size: large"/>
              </a-popover>
            </template>
            <a-select :value="sinkBaseProperties.omitIfEmpty" @change="changeValomitIfEmpty">
              <a-select-option value="false">false</a-select-option>
              <a-select-option value="true">true</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
        <a-button type="primary" @click="logSinkBaseProperty">Primary Button</a-button>
      </a-card>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {TagsFilled, QuestionCircleOutlined,CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons-vue';

export default defineComponent({
  name: "SinkBaseProperties",
  components: {
    TagsFilled,
    QuestionCircleOutlined,
    CaretDownOutlined,
    CaretUpOutlined,
  },
  props:{
    sinkBaseProperties:{
      type:Object,
    },
  },
  setup(){
    const activeKey = ref([]);
    // const sinkBaseProperties = reactive({
    //   concurrency: 1,
    //   bufferLength: 1024,
    //   retryInterval: 1000,
    //   retryCount: 0,
    //   cacheLength: 1024,
    //   cacheSaveInterval: 1000,
    //   runAsync: false,
    //   omitIfEmpty: false
    // });

    let collapseToggleStatus = false;
    return {
      // sinkBaseProperties,
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
      console.log(this.sinkBaseProperties)
    },
    logSinkBaseProperty(){
      console.log(this.sinkBaseProperties)
    },
    changeValConcurrency(e) {
      this.$emit('update:sinkBaseProperties.concurrency', e.target.concurrency)
    },
    changeValbufferLength(e) {
      this.$emit('update:sinkBaseProperties.bufferLength', e.target.bufferLength)
    },
    changeValretryInterval(e) {
      this.$emit('update:sinkBaseProperties.retryInterval', e.target.retryInterval)
    },
    changeValretryCount(e) {
      this.$emit('update:sinkBaseProperties.retryCount', e.target.retryCount)
    },
    changeValcacheLength(e) {
      this.$emit('update:sinkBaseProperties.cacheLength', e.target.cacheLength)
    },
    changeValcacheSaveInterval(e) {
      this.$emit('update:sinkBaseProperties.cacheSaveInterval', e.target.cacheSaveInterval)
    },
    changeValrunAsync(e) {
      this.$emit('update:sinkBaseProperties.runAsync', e.target.runAsync)
    },
    changeValomitIfEmpty(e) {
      this.$emit('update:sinkBaseProperties.omitIfEmpty', e.target.omitIfEmpty)
    },
  }
})
</script>

<style scoped>

</style>
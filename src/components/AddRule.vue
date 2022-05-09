<template>
  <div style="background: #ececec; padding: 10px" class="card-container">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="Stream">
        <div class="card-header header">
          <StreamList></StreamList>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Rules">
        <div class="card-header header">
          <div class="card-header header">
            <span><plus-outlined style="color: red"/> Add Rule</span>
            <a-button style="background: #28A745; float: right" @click="SubmitRule">
              <template #icon><save-filled style="color: white"/></template>
              <span style="font-weight: bold; color: white">Submit</span>
            </a-button>
            <a-button style="background: #007BFF; float: right" @click="returnRuleList">
              <template #icon><home-filled style="color:white;"/></template>
              <span style="font-weight: bold; color: white">Home</span>
            </a-button>
          </div>
        </div>

        <div class="ant-card-body" style="margin-top: 10px">
          <div class="ant-card-body">
            <a-form
              :model="ruleForm"
              name="basic"
            >
              <a-form-item
                name="name"
                :rules="[{required: true, message: 'the rule name can\'t be empty!'}]"
              >
                <template #label>
                  <span style="margin-right: 10px">Name</span>
                  <a-popover title="format tips" trigger="hover" placement="right">
                    <template #content>
                      <p style="width: 274px">The identification of the rule. The rule name cannot be duplicated in the same Kuiper instance.</p>
                    </template>
                    <question-circle-outlined style="font-size: large"/>
                  </a-popover>
                </template>
                <a-input v-model:value="ruleForm.name"></a-input>
              </a-form-item>

<!--              TODO-->
<!--              将sql编辑器内容与表单绑定-->
              <a-form-item
                name="ruleSql"
                :rules="[{required: true, message: 'SQL can\'t be empty!'}]"
              >
                <template #label>
                  <span style="margin-right: 10px">RuleSql</span>
                  <a-popover title="format tips" trigger="hover" placement="right">
                    <template #content>
                      <p style="width: 274px">The sql query to run for the rule.The Table name must be your stream name.For example "SELECT EdgexStream.temperature, EdgexStream.temp FROM EdgexStream where EdgexStream.temperature > EdgexStream.temp ".</p>
                    </template>
                    <question-circle-outlined style="font-size: large"/>
                  </a-popover>
                </template>

                <div class="card-header" style="background: #00000008; height: 36px">
                  <span style="font-weight: bold; font-size: 15px">
                    <console-sql-outlined style="color: cornflowerblue; padding-left: 10px; padding-top: 10px; font-size: large"/>
                    SQL Editor
                  </span>
                  <span style="float: right; color: #DC3545; font-size: 15px; padding-right: 10px; padding-top: 10px">
                    <warning-filled style="color: #DC3545; font-size: large"/>
                    SQL can't be empty!
                  </span>
                </div>
                <div class="card-header" style="background: #6C757D">
                    <span class="text-light">
                      <a-button style="border: none; background: none" title="formatter" @click="FormatSql">
                        <template #icon><menu-unfold-outlined style="color: white; font-size: 20px;"/></template>
                      </a-button>
                    </span>
                </div>
                <SqlEditor
                    ref="sqleditor"
                    :value="content"
                    @changeTextarea="changeTextarea($event)">
                </SqlEditor>
              </a-form-item>


            </a-form>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import {defineComponent, ref, reactive} from 'vue';
import {PlusOutlined, SaveFilled, HomeFilled, QuestionCircleOutlined, MenuUnfoldOutlined, ConsoleSqlOutlined, WarningFilled} from '@ant-design/icons-vue';
import SqlEditor from "@/components/SqlEditor";
import StreamList from "@/components/StreamList";

export default defineComponent({
  name: "AddRule",
  components :{
    StreamList,
    SqlEditor,
    PlusOutlined,
    SaveFilled,
    HomeFilled,
    QuestionCircleOutlined,
    MenuUnfoldOutlined,
    ConsoleSqlOutlined,
    WarningFilled,
  },
  methods: {
    returnRuleList(){
      this.$router.push({
        path: '/'
      })
    },
  },
  setup() {
    const ruleForm = reactive({
      name: '',
      sql: ''
    });

    const onFinish = values => {
      console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    return {
      activeKey: ref('2'),
      onFinish,
      onFinishFailed,
      ruleForm
    };
  },
})
</script>

<style scoped>

</style>
<template>
  <div style="background: #ececec; padding: 10px" class="card-container">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="Stream">
        <div class="card-header header">
          <span><file-add-outlined style="color: red"/> Add Stream</span>
          <a-button style="background: #28A745; float: right" @click="SubmitStreams">
            <template #icon><save-filled style="color: white"/></template>
            <span style="font-weight: bold; color: white">Submit</span>
          </a-button>
          <a-button style="background: #007BFF; float: right" @click="returnStreamList">
            <template #icon><home-filled style="color:white;"/></template>
            <span style="font-weight: bold; color: white">Home</span>
          </a-button>
        </div>
        <div class="card-header">
          <a-button style="background: #6C757D; margin-top: 5px; padding: 0px" @click="EdgexEditor()">
            <a-radio-group v-model:value="value">
              <a-radio :value="1" style="color: white; margin-left: 3px">
                <span style="padding: 0px">EdgeXStreamTemplate</span>
              </a-radio>
            </a-radio-group>
          </a-button>
          <a-button style="background: #6C757D; margin-top: 5px; padding: 0px" @click="CustomEditor()">
            <a-radio-group v-model:value="value">
              <a-radio :value="2" style="color: white; margin-left: 3px">CustomStreamTemplate</a-radio>
            </a-radio-group>
          </a-button>
        </div>
        <div class="card-body" style="margin-top: 10px">
          <div class="card-header" style="background: #6C757D">
            <span class="text-light">
              <a-button style="border: none; background: none" title="formatter" @click="FormatSql">
                <template #icon><menu-unfold-outlined style="color: white; font-size: 20px"/></template>
              </a-button>
            </span>
          </div>
          <SqlEditor
            ref="sqleditor"
            :value="content"
            @changeTextarea="changeTextarea($event)">
          </SqlEditor>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Rules">
        <div class="card-header header">
          <RuleList></RuleList>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {FileAddOutlined, SaveFilled, HomeFilled, MenuUnfoldOutlined} from '@ant-design/icons-vue';
import RuleList from "@/components/RuleList";
import SqlEditor from "@/components/SqlEditor";

export default defineComponent({
  name: "AddStream",
  components:{
    FileAddOutlined,
    SaveFilled,
    HomeFilled,
    MenuUnfoldOutlined,
    SqlEditor,
    RuleList
  },
  methods: {
    EdgexEditor(){
      this.$refs.sqleditor.edegxTemplate();
    },
    CustomEditor(){
      this.$refs.sqleditor.customTemplate();
    },
    returnStreamList(){
      console.log("return list")
      this.$router.push({
        path: '/'
      })
    },
    FormatSql() {
      this.$refs.sqleditor.sqlformat();
    },
  },
  setup() {
    const value = ref(1);
    return {
      activeKey: ref('1'),
      value,
    };
  },
});
</script>

<style scoped>

</style>
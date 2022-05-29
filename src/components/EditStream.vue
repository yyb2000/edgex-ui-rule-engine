<template>
  <div style="background: #ececec; padding: 10px" class="card-container">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="Stream">
        <div class="card-header header">
          <span><edit-filled style="color: red"/> Edit Stream</span>
          <a-button style="background: #28A745; float: right" @click="UpdateStream">
            <template #icon><save-filled style="color: white"/></template>
            <span style="font-weight: bold; color: white">Update</span>
          </a-button>
          <a-button style="background: #007BFF; float: right" @click="returnStreamList">
            <template #icon><home-filled style="color:white;"/></template>
            <span style="font-weight: bold; color: white">Home</span>
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
          >
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
import { defineComponent} from 'vue';
import SqlEditor from "@/components/SqlEditor";
import RuleList from "@/components/RuleList";
import {HomeFilled, SaveFilled, MenuUnfoldOutlined, EditFilled} from '@ant-design/icons-vue';
import { useRouter } from "vue-router";
import { findStreamByName, updateStream} from '@/api/index'

export default defineComponent({
  name: "EditStream",
  components: {
    SqlEditor,
    RuleList,
    HomeFilled,
    SaveFilled,
    MenuUnfoldOutlined,
    EditFilled
  },
  data() {
    return {
      content: '',
      name: '',
      streamJSONFormatObj: '',
      StreamFields: {
        Name: '',
        FieldType: ''
      },
      streamStringFormatObj: ''
    }
  },
  created() {
    this.getStreamSql()
  },
  setup(){
  },
  methods: {
    returnStreamList() {
      console.log("return list")
      this.$router.push({
        path: '/'
      })
    },
    FormatSql() {
      this.$refs.sqleditor.sqlformat();
    },
    getStreamSql() {
      const router = useRouter()
      this.name = router.currentRoute.value.query.id

      return findStreamByName(
          this.name,
          data => {
            this.streamJSONFormatObj = data
            this.dataFormatJSONToStringConvertor()
            this.$refs.sqleditor.setSqlValue(this.streamStringFormatObj);
            this.FormatSql()
          },
          error => {
            console.log('get stream info failed:', error)
          },
          () => {}
      )
    },
    dataFormatJSONToStringConvertor() {
      if (!this.streamJSONFormatObj) {
        return
      }

      let fieldsKVFormatArray = []
      this.streamJSONFormatObj?.StreamFields?.forEach((field) => {
        fieldsKVFormatArray.push(`${field.Name} ${field.FieldType}`)
      })

      let streamOptKVFormatArray = [];
      for (const [k,v] of Object.entries(this.streamJSONFormatObj.Options)) {
        streamOptKVFormatArray.push(`${k} = "${v}"`)
      }

      this.streamStringFormatObj = `CREATE STREAM ${this.streamJSONFormatObj?.Name} ( ${fieldsKVFormatArray.join(', ')} ) WITH ( ${streamOptKVFormatArray.join(', ')} )`
      console.log(this.streamStringFormatObj)
    },
    UpdateStream() {
      let sqlContent = this.$refs.sqleditor.getSqlValue()

      return updateStream(

          sqlContent,
          this.name,
          ()=>{
          },
          error => {
            console.log('edit stream info failed:', error)
          },
          () => {
            this.$router.push({
              path: '/'
            })
          }
      )
    }
  }
})
</script>

<style scoped>

</style>
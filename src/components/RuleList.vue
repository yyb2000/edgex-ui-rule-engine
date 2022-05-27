<template>
  <span> <unordered-list-outlined style="color: red"/> Rule List</span>
  <br />

  <a-button style="margin-top: 8px; padding-left: 8px; padding-right: 8px; background: #007BFF" @click="refreshRules">
    <template #icon><sync-outlined style="color: white"/></template>
    <span style="font-weight: bold; color: white">Refresh</span>
  </a-button>
  <a-button style="margin-top: 8px; padding-left: 8px; padding-right: 8px; background: #17A2B8" @click="addRule">
    <template #icon><plus-circle-filled style="color: white"/></template>
    <span style="font-weight: bold; color: white">Add</span>
  </a-button>

  <a-table :columns="columns" :data-source="ruleInfos">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'id'">
        <a>{{ record.id}}</a>
      </template>
      <template v-else-if="column.key === 'status metrics'" >
        <a-button style="background: none; border: none;" @click="enableMetricShow(record.id)">
          <template #icon><line-chart-outlined style="color: cornflowerblue;"/></template>
        </a-button>
      </template>
      <template v-else-if="column.key === 'operation'">
        <a-button :size="'small'" style="background: #28A745; padding: 2px 2px; border-radius: 5px;" @click="startrule(record.id)">
          <span style="font-weight: bold; color: white; font-size: 12px;">start</span>
        </a-button>
        <a-button :size="'small'" style="background: #17A2B8; padding: 2px 2px; border-radius: 5px; margin: 0px 4px" @click="restartrule(record.id)">
          <span style="font-weight: bold; color: white; font-size: 12px">restart</span>
        </a-button>
        <a-button :size="'small'" style="background: #DC3545; padding: 2px 2px; border-radius: 5px" @click="stoprule(record.id)">
          <span style="font-weight: bold; color: white; font-size: 12px">stop</span>
        </a-button>
      </template>
      <template v-else-if="column.key === 'deleteOrEdit'">
        <a-button :size="'small'" style="background: #28A745; padding: 2px 2px; border-radius: 5px;" @click="editRule(record.id)">
          <span style="font-weight: bold; color: white; font-size: 12px">Edit</span>
        </a-button>
        <a-button :size="'small'" style="background: #DC3545; padding: 2px 2px; border-radius: 5px;" @click="openDelConfirm(record.id)">
          <span style="font-weight: bold; color: white; font-size: 12px">Delete</span>
        </a-button>
      </template>
    </template>
  </a-table>

  <a-card v-if="enableStatus">
    <template #title>
      <line-chart-outlined style="margin-right: 20px; color: cornflowerblue"/>
      <span style="font-weight: bold">{{ruleName}}</span>
      <span style="margin-left: 3px">Status Metrics</span>
      <a-button :size="'small'" style="margin-left: 5px; margin-top: 8px; padding-left: 8px; padding-right: 8px; background: #007BFF; border-radius: 5px" @click="refreshMetric(ruleName)">
        <template #icon><sync-outlined style="color: white"/></template>
        <span style="font-weight: bold; color: white; font-size: 10px">Refresh</span>
      </a-button>
    </template>
    <template #extra>
      <a-button :size="'small'" style="background: #DC3545; float: right;" @click="MetricShowClose">
        <template #icon><close-outlined style="color: white; font-size: 10px"/></template>
      </a-button>
    </template>
    <span>{{ruleStatusMetrics}}</span>
  </a-card>
</template>

<script>
import { UnorderedListOutlined, SyncOutlined, PlusCircleFilled, LineChartOutlined, CloseOutlined } from '@ant-design/icons-vue';
import {defineComponent} from 'vue';
import {
  allRules,
  startRule,
  restartRule,
  stopRule,
  getRuleStatusMetricsById,
  deleteOneRuleById,
} from '@/api/index'
import {Modal} from "ant-design-vue";

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id'
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status'
}, {
  title: 'Status Metrics',
  key: 'status metrics'
}, {
  title: 'Operation',
  key: 'operation'
}, {
  title: 'Action',
  key: 'deleteOrEdit'
}];

let RuleInfo = function (id, status) {
  this.id = id
  this.status = status
}

const enableStatus = false
let ruleName = ''
let ruleStatusMetrics = ''

export default defineComponent({
  name: "RuleList",
  components:{
    UnorderedListOutlined,
    SyncOutlined,
    PlusCircleFilled,
    LineChartOutlined,
    CloseOutlined,
  },
  data() {
    return {
      enableStatus,
      ruleInfos: [],
      refreshMsg: 'Refresh',
      refreshDone: null,
      refreshFailed: null,
      hideRefreshMsg: null,
      ruleName,
      ruleStatusMetrics,
      columns
    };
  },
  created() {
    this.getRuleList()
    this.refreshDone = this.createAlert('refresh succeeded!', 'success')
    this.refreshFailed = this.createAlert('refresh failed!', 'error')
    this.hideRefreshMsg = this.debounce(() => {
      this.refreshDone.hide()
      this.refreshFailed.hide()
    }, 2000)
  },
  setup() {},
  methods: {
    getRuleList() {
      let _this = this
      let ruleInfos = new RuleInfo()

      return allRules(
          data => {
            console.log(data)
            ruleInfos = data
          },
          error => {
            console.log('get rule info failed:', error)
          },
          () => {
            _this.ruleInfos = ruleInfos
          }
      )
    },
    refreshRules(event) {
      let _this = this

      let button = event.target
      _this.refreshMsg = 'Loading...'
      button.disabled = true

      _this
          .getRuleList()
          .then(() => {
            _this.refreshDone.show()
          })
          .catch(() => {
            _this.refreshFailed.show()
          })
          .finally(() => {
            _this.refreshMsg = 'Refresh'
            button.disabled = false
            _this.hideRefreshMsg()
          })
    },
    startrule(id) {
      let _this = this

      return startRule(
          id,
          () => {
            console.log('start rule success')
          },
          error => {
            console.log('start rule failed:', error)
          },
          () => {
            _this.getRuleList()
          }

      )
    },
    restartrule(id) {
      let _this = this

      return restartRule(
          id,
          () => {
            console.log('restart rule success')
          },
          error => {
            console.log('restart rule failed:', error)
          },
          () => {
            _this.getRuleList()
          }

      )
    },
    stoprule(id) {
      let _this = this

      return stopRule(
          id,
          () => {
            console.log('stop rule success')
          },
          error => {
            console.log('stop rule failed:', error)
          },
          () => {
            _this.getRuleList()
          }

      )
    },
    addRule(){
      this.$router.push({
        path: '/rule/addRule'
      })
    },
    editRule(){
      this.$router.push({
        path: '/rule/editRule'
      })
    },
    enableMetricShow(id){
      let _this = this
      _this.enableStatus = true
      _this.ruleName = id

      return getRuleStatusMetricsById(
          id,
          data => {
            try {
              _this.ruleStatusMetrics = JSON.stringify(data,null,3)
              console.log(_this.ruleStatusMetrics)
            }catch (e) {
              _this.ruleStatusMetrics = data
            }
          },
          error => {
            console.log('get rule status metrics failed:', error)
          },
          () => {
          }
      )
    },
    refreshMetric(id){
      this.enableMetricShow(id)
    },
    MetricShowClose(){
      this.enableStatus = false
    },
    openDelConfirm(_id) {
      Modal.confirm({
        title: 'warning',
        class: 'deleteConfirm',
        icon: '',
        centered: true,
        content: 'The data will be permanently erased!!! Are you sure to execute delete operation？',
        onOk(){
          return deleteOneRuleById(
              _id ,
              () => {
              },
              error => {
                console.log('delete rule failed:', error)
              },
              () => {
              }
          )
        }
      })
    },
  }
})
</script>

<style scoped>

</style>
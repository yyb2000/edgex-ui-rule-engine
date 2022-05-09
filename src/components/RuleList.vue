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
  <a-button  style="margin-top: 8px; padding-left: 8px; padding-right: 8px; background: #28A745;" @click="editRule">
    <template #icon><edit-filled style="color: white" /></template>
    <span style="font-weight: bold; color: white;">Edit</span>
  </a-button>
  <a-button style="margin-top: 8px; padding-left: 8px; padding-right: 8px; background: #DC3545;" @click="deleteRule">
    <template #icon><delete-filled style="color: white" /></template>
    <span style="font-weight: bold; color: white;">Delete</span>
  </a-button>

  <a-table :row-selection="rowSelection" :columns="columns" :data-source="data">
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
        <a-button :size="'small'" style="background: #28A745; padding: 2px 2px; border-radius: 5px;" @click="startRule(record.id)">
          <span style="font-weight: bold; color: white; font-size: 12px;">start</span>
        </a-button>
        <a-button :size="'small'" style="background: #17A2B8; padding: 2px 2px; border-radius: 5px; margin: 0px 4px" @click="restartRule(record.id)">
          <span style="font-weight: bold; color: white; font-size: 12px">restart</span>
        </a-button>
        <a-button :size="'small'" style="background: #DC3545; padding: 2px 2px; border-radius: 5px" @click="stopRule(record.id)">
          <span style="font-weight: bold; color: white; font-size: 12px">stop</span>
        </a-button>
      </template>
    </template>
  </a-table>

  <a-card>
    <template #title>
      <line-chart-outlined style="margin-right: 20px; color: cornflowerblue"/>
      <span style="font-weight: bold">{{statusMetricsRuleID}}</span>
      <span style="margin-left: 3px">Status Metrics</span>
      <a-button :size="'small'" style="margin-left: 5px; margin-top: 8px; padding-left: 8px; padding-right: 8px; background: #007BFF; border-radius: 5px" @click="refreshMetric">
        <template #icon><sync-outlined style="color: white"/></template>
        <span style="font-weight: bold; color: white; font-size: 10px">Refresh</span>
      </a-button>
    </template>
    <template #extra>
      <a-button :size="'small'" style="background: #DC3545; float: right;" @click="MetricShowClose">
        <template #icon><close-outlined style="color: white; font-size: 10px"/></template>
      </a-button>
    </template>

<!--    TODO-->
    <p>{{ruleStatusMetrics}}</p>
  </a-card>
</template>

<script>
import { UnorderedListOutlined, SyncOutlined, PlusCircleFilled, EditFilled, DeleteFilled, LineChartOutlined, CloseOutlined } from '@ant-design/icons-vue';
import {defineComponent} from 'vue';

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
}];
const data = [{
  key :'1',
  id: 'demo1',
  status: 'running'
}, {
  key: '2',
  id: 'demo2',
  status: 'stopped'
}];

export default defineComponent({
  name: "RuleList",
  components:{
    UnorderedListOutlined,
    SyncOutlined,
    PlusCircleFilled,
    EditFilled,
    DeleteFilled,
    LineChartOutlined,
    CloseOutlined
  },
  setup() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: rules => ({
        disabled: rules.ID === 'Disabled User',
        // Column configuration not to be checked
        name: rules.ID,
      }),
    };
    return {
      data,
      columns,
      rowSelection,
    };
  },
  methods: {
    addRule(){
      this.$router.push({
        path: '/rule/addRule'
      })
    },
    editRule(){
      this.$router.push({
        path: '/rule/editRule'
      })
    }
  }
})
</script>

<style scoped>

</style>
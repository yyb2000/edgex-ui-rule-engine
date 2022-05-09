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
        <a-button style="background: none; border: none;" @click="statusMetricsShow">
          <template #icon><line-chart-outlined style="color: cornflowerblue;"/></template>
        </a-button>
      </template>
      <template v-else-if="column.key === 'operation'">
        <a-button style="background: #28A745; padding: 2px 2px; border-radius: 6px;" @click="startRule(rule.id)">
          <span style="font-weight: bold; color: white; font-size: 12px;">start</span>
        </a-button>
        <a-button style="background: #17A2B8; padding: 2px 2px; border-radius: 6px; margin: 0px 4px" @click="restartRule(rule.id)">
          <span style="font-weight: bold; color: white; font-size: 12px">restart</span>
        </a-button>
        <a-button style="background: #DC3545; padding: 2px 2px; border-radius: 6px" @click="stopRule(rule.id)">
          <span style="font-weight: bold; color: white; font-size: 12px">stop</span>
        </a-button>
      </template>
    </template>
  </a-table>
</template>

<script>
import { UnorderedListOutlined, SyncOutlined, PlusCircleFilled, EditFilled, DeleteFilled, LineChartOutlined } from '@ant-design/icons-vue';
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
    LineChartOutlined
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
  }
})
</script>

<style scoped>

</style>
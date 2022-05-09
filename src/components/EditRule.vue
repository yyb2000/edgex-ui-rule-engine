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
            <span><file-add-outlined style="color: red"/> Add Rule</span>
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
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>

export default {
name: "EditRule"
}
</script>

<style scoped>

</style>
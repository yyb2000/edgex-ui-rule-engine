<template>
  <div v-if="agentDown" class="card text-dark bg-light">
    <div class="card-body mt-5 mb-5 ms-4 me-5 w-auto">
      <h4 class="card-title fw-bolder">Oops!!! system agent service is unavailable!</h4>
      <p class="card-text fs-5">
        This could be a network reason, or it could be that the rule engine microservice is not
        running, make sure there is no network problem or that the system agent service is already
        running!
      </p>
      <hr />
      <p class="card-text fs-6">
        EdgeXFoundry uses a microservices architecture, each service is running independently,
        please make sure that the current service is already running, if you have manually started
        the service, click the Refresh button.
      </p>
      <button type="button" class="btn btn-primary" @click="reping">
        <span class="fw-bold"> <i class="bi bi-arrow-clockwise pe-1"></i>{{ refreshMsg }}</span>
      </button>
    </div>
  </div>

  <div v-else style="background: #ececec; padding: 10px" class="card-container">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="Stream">
        <div class="card-header header">
          <StreamList></StreamList>
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
import StreamList from "@/components/StreamList";
import RuleList from "@/components/RuleList";
export default defineComponent({
  name: 'ListView',
  components:{
    StreamList,
    RuleList
  },
  setup() {
    return {
      activeKey: ref('1'),
    };
  },
});
</script>

<style>
.card-container p {
  margin: 0;
}
.card-container > .ant-tabs-card .ant-tabs-content {
  margin-top: -16px;
}
.card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  padding: 16px;
  background: #ffffff;
}
.card-container > .ant-tabs-card > .ant-tabs-nav::before {
  display: none;
}
.card-container > .ant-tabs-card .ant-tabs-tab,
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: #141414;
}
.card-container > .ant-tabs-card .ant-tabs-tab-active,
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
  background: #fff;
  border-color: #fff;
}
#components-tabs-demo-card-top .code-box-demo {
  padding: 24px;
  overflow: hidden;
  background: #f5f5f5;
}
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-content {
  height: 120px;
  margin-top: -8px;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}
[data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {
  background: #000;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  background: #141414;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
  background: #141414;
  border-color: #141414;
}
</style>
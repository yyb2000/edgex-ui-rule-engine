import { createRouter, createWebHashHistory } from 'vue-router'
import ListView from "@/views/ListView";
import AddStream from "@/components/AddStream";
import StreamList from "@/components/StreamList";
import EditStream from "@/components/EditStream";
import RuleList from "@/components/RuleList";
import AddRule from "@/components/AddRule";
import EditRule from "@/components/EditRule";

const routes = [
  {
    path: '/',
    name: 'rule-engine',
    component: ListView
  },
  {
    path: '/stream',
    name: 'StreamList',
    component: StreamList
  },
  {
    path: '/stream/addStream',
    name: 'AddStream',
    component: AddStream
  },
  {
    path: '/stream/editStream',
    name: 'EditStream',
    component: EditStream
  },
  {
    path: '/rule',
    name: 'RuleList',
    component: RuleList
  },
  {
    path: '/rule/addRule',
    name: 'AddRule',
    component: AddRule
  },
  {
    path: '/rule/editRule',
    name: 'EditRule',
    component: EditRule
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

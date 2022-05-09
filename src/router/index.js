import { createRouter, createWebHashHistory } from 'vue-router'
import ListView from "@/views/ListView";
import AddStream from "@/components/AddStream";
import StreamList from "@/components/StreamList";
import EditStream from "@/components/EditStream";

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

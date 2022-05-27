<template>
  <span> <unordered-list-outlined style="color: red"/> System Services List</span>
  <br/>
  <a-button style="margin-bottom: 8px; padding-left: 8px; padding-right: 8px; background: #007BFF" @click="refreshStreams">
    <template #icon><sync-outlined style="color: white"/></template>
    <span style="font-weight: bold; color: white">Refresh</span>
  </a-button>
  <a-button style="margin-top: 8px; padding-left: 8px; padding-right: 8px; background: #28A745" @click="addStream">
    <template #icon><plus-circle-filled style="color: white"/></template>
    <span style="font-weight: bold; color: white">Add</span>
  </a-button>
  <br/>

  <a-list size="large" bordered :data-source="streamInfo" style="margin-top: 10px; background: white">
    <template #renderItem="{ item }" >
      <a-list-item style="padding-left: 15px; padding-right: 10px; margin-top: auto;">
        <tags-filled style="padding-right: 5px; font-size: 30px; color: gray"/>
        {{item}}
        <a-button :size="'small'" style="background: #DC3545; float: right; padding: 0 5px; border-radius: 5px" @click="openDelConfirm(item)">
          <template #icon><delete-filled style="color: white" /></template>
          <span style="font-weight: bold; color: white; font-size: small">Delete</span>
        </a-button>
        <a-button :size="'small'" style="background: #17A2B8; float: right; padding: 0 5px; border-radius: 5px" @click="editStream(item)">
          <template #icon><edit-filled style="color: white" /></template>
          <span style="font-weight: bold; color: white; font-size: small">Edit</span>
        </a-button>
      </a-list-item>
    </template>
  </a-list>
</template>

<script>
import { UnorderedListOutlined, SyncOutlined ,PlusCircleFilled, TagsFilled, EditFilled, DeleteFilled} from '@ant-design/icons-vue';
import {defineComponent} from 'vue';
import { allStreams, deleteOneStreamById } from '@/api/index'
import {Modal} from 'ant-design-vue'

let StreamInfo = function () {
}

export default defineComponent({
  name: "StreamList",
  components:{
    UnorderedListOutlined,
    SyncOutlined,
    PlusCircleFilled,
    TagsFilled,
    EditFilled,
    DeleteFilled,

  },
  setup() {},
  data() {
    return {
      streamInfo: [],
      refreshMsg: 'Refresh',
      refreshDone: null,
      refreshFailed: null,
      hideRefreshMsg: null,
    }
  },
  created() {
    this.getStreamList()
    this.refreshDone = this.createAlert('refresh succeeded!', 'success')
    this.refreshFailed = this.createAlert('refresh failed!', 'error')
    this.hideRefreshMsg = this.debounce(() => {
      this.refreshDone.hide()
      this.refreshFailed.hide()
    }, 2000)
  },
  methods: {
    addStream(){
      this.$router.push({
        path: '/stream/addStream'
      })
    },
    editStream(name){
      this.$router.push({
        path: '/stream/editStream',
        query: {
          id: name
        }
      })
    },
    getStreamList() {
      let _this = this
      let streamInfo = new StreamInfo()

      return allStreams(
          data => {
            console.log(data)
            streamInfo = data
          },
          error => {
            console.log('get stream info failed:', error)
          },
          () => {
            _this.streamInfo = streamInfo
          }
      )
    },
    refreshStreams(event) {
      let _this = this

      let button = event.target
      _this.refreshMsg = 'Loading...'
      button.disabled = true

      _this
        .getStreamList()
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
    openDelConfirm(_id) {
      Modal.confirm({
        title: 'warning',
        class: 'deleteConfirm',
        icon: '',
        centered: true,
        content: 'The data will be permanently erased!!! Are you sure to execute delete operation？',
        onOk(){
          return deleteOneStreamById(
              _id ,
              () => {
              },
              error => {
                console.log('delete stream info failed:', error)
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
<template>
  <el-form :inline="true" :model="state" class="demo-form-inline">
    <el-form-item label="name">
      <el-input v-model="state.name" clearable />
    </el-form-item>
    <el-form-item>
      <el-button :icon="Search" @click="onQuery">search</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="state.tableData" stripe style="width: 100%" border>
    <el-table-column label="picture" width="130">
      <template #default="scope">
        <img :src="scope.row.avatar" style="width: 100px;" />
      </template>
    </el-table-column>
    <el-table-column prop="orderNo" label="orderNo" />
    <el-table-column prop="name" label="name" />
    <el-table-column prop="gender" label="gender" />
    <el-table-column prop="service" label="service" />
    <el-table-column prop="phone" label="phone" />
    <el-table-column prop="skill" label="skill" width="400"/>
    <el-table-column prop="workDay" label="workDay" />
    <el-table-column label="operate" width="240">
      <template #default="scope">
        <el-button type="success" :icon="ChatDotRound" @click="openChatWindow(scope.row)">Start a chat</el-button>
        <el-button type="danger" @click="endOrder(scope.row.id)">Close the order</el-button>
      </template>
    </el-table-column>
  </el-table>

  <Chat v-model:open="state.dialogVisible" :person="state.person" />
</template>

<script setup>
import { reactive, ref } from 'vue'
import {
  ChatDotRound,
  Search,
} from '@element-plus/icons-vue'
import Chat from '../components/Chat.vue'
import request from "@/utils/request.js";

const state = reactive({
  name: '',
  person: {},
  dialogVisible: false,
})

const onQuery = () => {
  request.get('/my-booking')

  state.tableData = [
    {
      id: 1,
      name: '李凯',
      gender: 'man',
      age: 48,
      office: 'Cardiac surgery',
      phone: '13011211211',
      imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      skill: 'He specializes in the diagnosis and treatment of heart disease',
      workDay: 'Monday,Friday',
    },
  ]
}
onQuery()


const openChatWindow = (row) => {
  state.dialogVisible = true
  state.person = row
}

const endOrder = async (id) => {
  await request.post('/end-order', { id })
}
</script>

<style scoped lang="scss">

</style>

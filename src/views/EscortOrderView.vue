<template>
  <el-form :inline="true" :model="state" class="demo-form-inline">
    <el-form-item label="patient name">
      <el-input v-model="state.name" clearable />
    </el-form-item>
    <el-form-item>
      <el-button :icon="Search" @click="onQuery">Search</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="state.tableData" stripe style="width: 100%" border>
    <el-table-column prop="_id" label="Order number" />
    <el-table-column prop="state" label="Order state" />
    <el-table-column label="patient avatar" width="130">
      <template #default="scope">
        <Image :src="scope.row.user.avatar" style="width: 100px;"/>
      </template>
    </el-table-column>
    <el-table-column prop="user.nickname" label="patient name" />
    <el-table-column prop="user.gender" label="patient gender" />
    <el-table-column prop="user.phone" label="Escorts phone" />
    <el-table-column prop="doctor.name" label="doctor name" />
    <el-table-column prop="doctor.phone" label="doctor phone" />
    <el-table-column prop="doctor.work_day" label="doctor work_day" />
    <el-table-column prop="doctor.office.address" label="Departmentaddress" />
    <el-table-column label="operate" width="150">
      <template #default="scope">
        <el-button type="success" :icon="ChatDotRound" @click="openChatWindow(scope.row)">with patient chat</el-button>
      </template>
    </el-table-column>
  </el-table>

  <Chat v-model:open="state.dialogVisible" :person="state.person" />
</template>

<script setup>
import { reactive } from 'vue'
import {
  ChatDotRound,
  Search,
} from '@element-plus/icons-vue'
import Chat from '../components/Chat.vue'
import Image from '../components/Image.vue'
import request from "@/utils/request.js";
import {useUserStore} from '@/stores/user';

const userStore = useUserStore();

const state = reactive({
  name: '',
  person: {},
  dialogVisible: false,
  tableData: [],
})

const onQuery = async () => {
  const user_id = userStore.state._id
  state.tableData = await request.get(`/order/escort/list?user_id=${user_id}&name=${state.name}`)
}
onQuery()


const openChatWindow = (row) => {
  state.dialogVisible = true
  state.person = row.user
}
</script>

<style scoped lang="scss">

</style>

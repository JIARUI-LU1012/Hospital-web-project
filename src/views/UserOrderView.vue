<template>
  <el-form :inline="true" :model="state" class="demo-form-inline">
    <el-form-item label="Escorts name">
      <el-input v-model="state.name" clearable />
    </el-form-item>
    <el-form-item>
      <el-button :icon="Search" @click="onQuery">Search</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="state.tableData" stripe style="width: 100%" border>
    <el-table-column prop="_id" label="No." />
    <el-table-column prop="state" label="State" />
    <el-table-column label="Avatar" width="130">
      <template #default="scope">
        <Image :src="scope.row.escort.avatar" style="width: 100px;"/>
      </template>
    </el-table-column>
    <el-table-column prop="escort.nickname" label="Escorts Name" />
    <el-table-column prop="escort.gender" label="Escorts Gender" />
    <el-table-column prop="escort.service" label="Services" />
    <el-table-column prop="escort.phone" label="Escorts Phone" />
    <el-table-column prop="doctor.name" label="Doctor Name" />
    <el-table-column prop="doctor.phone" label="Doctor Phone" />
    <el-table-column prop="doctor.work_day" label="Doctor Work Day" />
    <el-table-column prop="doctor.office.address" label="Department Address" />
    <el-table-column prop="doctor.office.address" label="Department Address" />
    <el-table-column label="operate" width="200">
      <template #default="scope">
        <div v-if="scope.row.state !== 'complete'" >
          <el-popover
            placement="bottom"
            :width="230"
            trigger="click"
            content="this is content, this is content, this is content"
          >
            <template #reference>
              <el-button type="warning" size="small">Pay</el-button>
            </template>
            <img style="width: 200px" src="../assets/payment.jpg" alt="">
          </el-popover>

          <el-button type="success" size="small" @click="openChatWindow(scope.row)">Chat</el-button>
          <el-button type="danger" size="small" @click="finishOrder(scope.row)">Finish</el-button>
        </div>
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
  state.tableData = await request.get(`/order/user/list?user_id=${user_id}&name=${state.name}`)
}
onQuery()


const openChatWindow = (row) => {
  state.dialogVisible = true
  state.person = row.escort
}

const finishOrder = async (row) => {
  await request.post('/order/finish', { id: row._id, escort_id: row.escort._id })
  onQuery()
}
</script>

<style scoped lang="scss">

</style>

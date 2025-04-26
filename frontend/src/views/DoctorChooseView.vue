<template>
  <el-form :inline="true" :model="state" class="demo-form-inline">
    <el-form-item label="Department">
      <el-select v-model="state.office_id" style="width: 200px" placeholder="Please select a department">
        <el-option :label="item.name" :value="item._id" v-for="item in state.officeList" :key="item._id" />
      </el-select>
    </el-form-item>
    <el-form-item label="Doctor's appointment date">
      <el-checkbox-group v-model="state.work_day" size="small">
        <el-checkbox label="Monday" value="Monday"  />
        <el-checkbox label="Tuesday" value="Tuesday"  />
        <el-checkbox label="Wednesday and other diseases" value="Wednesday and other diseases"  />
        <el-checkbox label="Thursday" value="Thursday"  />
        <el-checkbox label="Friday" value="Friday"  />
        <el-checkbox label="Saturday" value="Saturday"  />
        <el-checkbox label="Sunday" value="Sunday"  />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="Search" @click="onQuery">Search</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="state.tableData" stripe style="width: 100%;" border>
<!--    <el-table-column prop="_id" label="编号" />-->
    <el-table-column prop="name" label="name" />
    <el-table-column prop="gender" label="gender" />
    <el-table-column prop="age" label="age" />
    <el-table-column prop="office.name" label="Department" />
    <el-table-column prop="phone" label="phone" />
    <el-table-column label="avatar" width="130">
      <template #default="scope">
        <Image :src="scope.row.avatar" style="width: 100px; height: 100px;"/>
      </template>
    </el-table-column>
    <el-table-column prop="skill" label="skill" width="400"/>
    <el-table-column prop="work_day" label="work_day" />
    <el-table-column prop="booking_person_num" label="Current number of appointments" />
    <el-table-column label="operate" width="100">
      <template #default="scope">
        <el-button v-if="scope.row.booking_person_num < 5" type="success" @click="onSubmit(scope.row)">booking</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script setup>
import { reactive } from 'vue'
import {ElMessageBox} from 'element-plus'
import {
  Plus,
  Search,
} from '@element-plus/icons-vue'
import Image from "@/components/Image.vue";
import request from "@/utils/request";
import {useUserStore} from '@/stores/user';

const userStore = useUserStore()

const props = defineProps({
  escort: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['onBooking'])

const state = reactive({
  office_id: '',
  work_day: [],
  tableData: [],
  officeList: [],
})

const init = async () => {
  state.officeList = await request.get('/office/list')
}
init()

const onQuery = async () => {
  state.tableData = await request.get('/doctor/list?office_id=' + state.office_id+'&work_day='+state.work_day.join(','))
}
onQuery()

const onSubmit = async (doctor) => {
  ElMessageBox.confirm(
    'Are you sure?',
    'hint',
    {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'cancel',
      type: 'warning',
    }
  ).then(() => {
    request.post('/user/escort/booking', {
      escort: props.escort,
      user: userStore.state,
      doctor,
    }).then((data) => {
      if(data.code === 0) {
        emit('onBooking')
      }
    })
  })
}

</script>

<style scoped lang="scss">

</style>

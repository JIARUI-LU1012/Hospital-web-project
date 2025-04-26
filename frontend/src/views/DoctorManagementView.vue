<template>
  <el-form :inline="true" :model="state" class="demo-form-inline">
    <el-form-item label="name">
      <el-input v-model="state.name" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="Search" @click="onQuery">Search</el-button>
      <el-button type="success" :icon="Plus" @click="onAdd">plus</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="state.tableData" stripe style="width: 100%" border>
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
    <el-table-column prop="booking_person_num" label="Current number of appointments" width="120"/>
    <el-table-column label="operate" width="100">
      <template #default="scope">
        <el-link type="primary" :underline="false" @click="handleEdit(scope.row)" class="mr-10">edit</el-link>
        <el-link type="danger" :underline="false" @click="handleDelete(scope.row._id)"> delete</el-link>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="state.dialogFormVisible" title="Doctor's information" min-width="450">
    <el-form :model="form" label-width="auto">
      <el-form-item label="name" >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="age" >
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item label="gender">
        <el-radio-group v-model="form.gender">
          <el-radio value="male">male</el-radio>
          <el-radio value="female">female</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Department">
        <el-select v-model="form.office_id">
          <el-option :label="item.name" :value="item._id" v-for="item in state.officeList" :key="item._id" />
        </el-select>
      </el-form-item>
      <el-form-item label="phone" >
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="work_day" >
        <el-checkbox-group v-model="form.work_day" size="small">
          <el-checkbox label="Monday" value="Monday" border />
          <el-checkbox label="Tuesday" value="Tuesday" border />
          <el-checkbox label="Wednesday and other diseases" value="Wednesday and other diseases" border />
          <el-checkbox label="Thursday" value="Thursday" border />
          <el-checkbox label="Friday" value="Friday" border />
          <el-checkbox label="Saturday" value="Saturday" border />
          <el-checkbox label="Sunday" value="Sunday" border />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="avatar" >
        <Uploader v-model="state.avatar"/>
      </el-form-item>
      <el-form-item label="skill" >
        <el-input v-model="form.skill" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogFormVisible = false">close</el-button>
        <el-button type="primary" @click="onSubmit">save</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive } from 'vue'
import {
  Plus,
  Search,
} from '@element-plus/icons-vue'
import Uploader from "@/components/Uploader.vue";
import Image from "@/components/Image.vue";
import request from "@/utils/request";

const state = reactive({
  name: '',
  dialogFormVisible: false,
  tableData: [],
  officeList: [],
})

const obj = {
  name: null,
  gender: '',
  age: null,
  office_id: null,
  phone: null,
  avatar: null,
  skill: null,
  work_day: [],
  booking_person_num: 0,
}

const form = reactive({})

const init = async () => {
  state.officeList = await request.get('/office/list')
}
init()

const onQuery = async () => {
  state.tableData = await request.get('/doctor/list?name=' + state.name)
}
onQuery()

const onAdd = () => {
  Object.assign(form, obj)
  state.dialogFormVisible = true
}

const onSubmit = async () => {
  state.dialogFormVisible = false
  await request.post('/doctor/save', form)
  onQuery()
}

const handleEdit = (row) => {
  Object.assign(form, row)
  delete form.office
  state.dialogFormVisible = true
}

const handleDelete = async (id) => {
  await request.delete(`/doctor/delete/${id}`)
  onQuery()
}
</script>

<style scoped lang="scss">

</style>

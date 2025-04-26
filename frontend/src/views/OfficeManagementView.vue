<template>
  <el-form :inline="true" :model="state" class="demo-form-inline">
    <el-form-item label="Department">
      <el-input v-model="state.name" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="Search" @click="onQuery">Search</el-button>
      <el-button type="success" :icon="Plus" @click="onAdd">plus</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="state.tableData" stripe style="width: 100%" border>
    <el-table-column prop="name" label="Department name" />
    <el-table-column prop="address" label="address" />
    <el-table-column prop="major" label="major" />
    <el-table-column label="operate" width="100">
      <template #default="scope">
        <el-link type="primary" :underline="false" @click="handleEdit(scope.row)" class="mr-10">edit </el-link>
        <el-link type="danger" :underline="false" @click="handleDelete(scope.row._id)"> delete</el-link>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="state.dialogFormVisible" title="Department信息" width="450">
    <el-form :model="form" label-width="auto">
      <el-form-item label="Departmentname" >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="major" >
        <el-input v-model="form.major" />
      </el-form-item>
      <el-form-item label="address" >
        <el-input v-model="form.address" type="textarea" />
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
import request from "@/utils/request";

const state = reactive({
  name: '',
  dialogFormVisible: false,
  tableData: [],
})

const obj = {
  name: null,
  address: null,
  major: null,
}

const form = reactive({})

const onQuery = async () => {
  state.tableData = await request.get('/office/list?name=' + state.name)
}
onQuery()

const onAdd = async () => {
  Object.assign(form, obj)
  state.dialogFormVisible = true
}

const onSubmit = async () => {
  state.dialogFormVisible = false
  await request.post('/office/save', form)
  onQuery()
}

const handleEdit = (row) => {
  Object.assign(form, row)
  state.dialogFormVisible = true
}

const handleDelete = async (id) => {
  await request.delete(`/office/delete/${id}`)
  onQuery()
}

</script>

<style scoped lang="scss">

</style>

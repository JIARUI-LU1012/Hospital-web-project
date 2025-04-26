<template>
  <el-row justify="center">
    <el-col :span="12">
      <div style="font-size: 38px;">Personal Center</div>
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="useraccount">
          {{userStore.state.username}}
        </el-form-item>
        <el-form-item label="name">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="gender">
          <el-radio-group v-model="form.gender">
            <el-radio value="male">male</el-radio>
            <el-radio value="female">female</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="avatar">
          <Uploader v-model="form.avatar"/>
        </el-form-item>
        <el-form-item label="address">
          <el-input v-model="form.address" type="textarea" />
        </el-form-item>
        <template v-if="form.role === 'escort'">
          <el-form-item label="Service price（RMB）">
            <el-input v-model.number="form.price" />
          </el-form-item>
          <el-form-item label="Services">
            <el-input v-model="form.service" type="textarea" />
          </el-form-item>
          <el-form-item label="remark">
            <el-input v-model="form.remark" type="textarea" />
          </el-form-item>
          <el-form-item label="state">
            {{form.state}}
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">modify</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user';
import Uploader from "@/components/Uploader.vue";
import request from "@/utils/request";

const userStore = useUserStore();

const form = reactive({
  ...userStore.state
})

const onSubmit = async () => {
  await request.post('/user/update', form)
  await userStore.actions.refreshLoginUser()
}
</script>

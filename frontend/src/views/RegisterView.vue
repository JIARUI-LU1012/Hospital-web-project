<template>
  <el-form
    ref="formRef"
    style="width: 600px"
    :model="registerForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-registerForm"
  >
    <el-form-item label="Account Type" prop="role">
      <el-radio-group v-model="registerForm.role">
        <el-radio value="patient">patient </el-radio>
        <el-radio value="escort">Escort</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="username" prop="username">
      <el-input v-model="registerForm.username" />
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input v-model="registerForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="name" prop="nickname">
      <el-input v-model="registerForm.nickname" />
    </el-form-item>
    <el-form-item label="phone" prop="phone">
      <el-input v-model="registerForm.phone" />
    </el-form-item>
    <template v-if="registerForm.role === 'escort'">
      <el-form-item label="Service price（RMB）" prop="price">
        <el-input v-model.number="registerForm.price" />
      </el-form-item>
      <el-form-item label="Services" prop="service">
        <el-input v-model="registerForm.service" />
      </el-form-item>
      <el-form-item label="remark" prop="remark">
        <el-input v-model="registerForm.remark" />
      </el-form-item>
      <el-form-item label="phone" prop="phone">
        <el-input v-model="registerForm.phone" />
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(formRef)">submit</el-button>
      <el-button type="" @click="router.push('/')">Go back to Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import request from "@/utils/request.js";

const router = useRouter()

const formRef = ref()
const registerForm = reactive({
  role: 'patient',
  username: '',
  password: '',
  nickname: '',
  address: '',
  phone: '',
  price: '',
  remark: '',
  service: '',
  avatar: '',
  gender: '',
  state: '',
})

const rules = reactive({
  username: [
    { required: true, message: 'please enter username', trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: 'please enter name', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: 'please enter phone', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'please enter password', trigger: 'blur' },
  ],
})

const onSubmit = async (formEl) => {
  await formEl.validate((valid, fields) => {
    if (valid) {
      request.post('/user/register', registerForm).then(() => {
        router.push('/')
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped lang="scss">
.demo-registerForm {
  width: 400px;
  border: solid 1px #ccc;
  padding: 50px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>

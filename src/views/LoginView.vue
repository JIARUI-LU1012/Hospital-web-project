<template>
  <div class="login-container">
    <h1 class="title">Self-Service Escort System</h1>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="top"
    >
      <h2 class="center">User Login</h2>

      <el-form-item prop="username" label="Username">
        <el-input v-model="loginForm.username"/>
      </el-form-item>

      <el-form-item prop="password" label="Password">
        <el-input v-model="loginForm.password" type="password" show-password/>
      </el-form-item>

      <div>
        <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">Login</el-button>
      </div>
      <div>
        <el-button class="login-btn" @click="handleSignUp">SignUP</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user';
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter()

    const loginForm = reactive({
      username: '',
      password: '',
    })

    const loading = ref(false)

    const loginRules = reactive({
      username: [
        { required: true, message: 'Please enter your username', trigger: 'blur' }
      ],
      password: [
        { required: true, message: 'Please enter password', trigger: 'blur' },
      ],
    })

    const loginFormRef = ref()
    const handleLogin = () => {
      loginFormRef.value.validate((valid, fields) => {
        if(valid) {
          userStore.actions.login(loginForm)
        }
      })
    }

    return {
      loginForm,
      loginRules,
      loading,
      handleLogin,
      loginFormRef,
      handleSignUp() {
        router.push('/register')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-image: url('../assets/bg.jpg');
  background-size: cover;
  .title {
    font-size: 33px;
    color: white;
    font-weight: bold;
    margin-bottom: 30px;
  }
}

.login-form {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.sms-code-input {
  display: flex;
  width: 100%;
}

.sms-btn {
  margin-left: 10px;
  width: 120px;
}

.forget-pwd {
  float: right;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>

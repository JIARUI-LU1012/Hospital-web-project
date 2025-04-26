<template>
  <div class="card-panel">
    <el-container>
      <el-header>
        <h1>AI Doctor Diagnosis</h1>
      </el-header>
      <el-main>
        <div>
          <p>
            AI Doctor Diagnosis is an intelligent diagnosis system of AI Doctor. You can input your symptom description here, and our AI Doctor will give you the diagnosis result based on your symptom description.
          </p>
          <el-input v-model="form.description" type="textarea" :rows="5"></el-input>
          <div class="btn-right">
            <el-button type="primary" @click="submitForm">Submit</el-button>
          </div>
        </div>

        <div v-if="loading" class="loading">
          <el-skeleton :rows="5" animated />
        </div>

        <div v-if="renderedResult" class="diagnosis-result">
          <h2 style="font-weight: bold">Diagnosis Result:</h2>
          <div v-html="renderedResult"></div>
        </div>

        <div v-if="error" class="error">
          <el-alert
            :title="error"
            type="error"
            show-icon
          />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import request from "@/utils/request";
import {marked} from 'marked'

const form = ref({
  description: ''
})

const loading = ref(false)
const error = ref('')
const renderedResult = ref('')

const submitForm = async () => {
  if (!form.value.description.trim()) {
    error.value = 'Please enter the description of the illness'
    return
  }

  loading.value = true
  error.value = ''
  renderedResult.value = ''

  try {
    const data = await request.post('/ai/diagnosis', {
      description: form.value.description
    })

    renderedResult.value = marked(data.result)
  } catch (err) {
    alert(err)
    error.value = 'The diagnosis result cannot be obtained. Please try again later'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.el-header {
  text-align: center;
  margin-bottom: 20px;
}

.el-form {
  max-width: 600px;
  margin: 0 auto;
}

.loading {
  margin-top: 20px;
}

.diagnosis-result {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.error {
  margin-top: 20px;
}
h1 {
  font-size: 42px;
}
.card-panel {
  width: 70%;
  height: calc(100vh - 100px);
  margin: 0 auto;
}
.btn-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>

import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'http://localhost:3001'
const wsURL = 'ws://localhost:3002'


const instance = axios.create({
  baseURL,
  timeout: 150000,
  headers: {}
})

const requestGet = async (route) => {
  try {
    const response = await instance.get(route)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const requestPost = async (route, data) => {
  try {
    const response = await instance.post(route, data)
    if(response.data.code !== 0) {
      ElMessage({
        message: response.data.message,
        type: 'error',
      })
    } else {
      response.data.message && ElMessage({
        message: response.data.message,
        type: 'success',
      })
    }
    return response.data
  } catch (error) {
    console.error(error)
    ElMessage({
      message: error,
      type: 'error',
    })
  }
}

const requestDelete = async (route) => {
  try {
    const response = await instance.delete(route)
    if(response.data.code !== 0) {
      ElMessage({
        message: response.data.message,
        type: 'error',
      })
    } else {
      ElMessage({
        message: response.data.message,
        type: 'success',
      })
    }
    return response.data
  } catch (error) {
    console.error(error)
    ElMessage({
      message: error,
      type: 'error',
    })
  }
}

export default {
  baseURL,
  wsURL,
  get: requestGet,
  post: requestPost,
  delete: requestDelete,
}

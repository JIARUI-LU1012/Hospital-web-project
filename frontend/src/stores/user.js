import {reactive} from 'vue'
import {defineStore} from 'pinia'
import request from "@/utils/request.js";


export const useUserStore = defineStore('user', () => {
  const loginUser = JSON.parse(localStorage.getItem('loginUser') || '{}')
  const state = reactive(loginUser)

  const updateState = (data) => {
    Object.assign(state, data)
    localStorage.setItem('loginUser', JSON.stringify(data))
  }

  const actions = {
    async login(loginForm) {
      const response = await request.post('/user/login', loginForm)
      if (response.code === 0) {
        updateState(response.data)
        location.href = '/home'
      }
    },
    async refreshLoginUser() {
      const data = await request.get('/user/info/' + state._id)
      updateState(data)
    },
    logout() {
      localStorage.removeItem('loginUser')
      window.location.href = '/'
    },
  }

  return {state, actions}
})

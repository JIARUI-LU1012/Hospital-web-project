import {reactive} from 'vue'
import {defineStore} from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const state = reactive({
    chatList: [],
  })

  const actions = {
  }

  return {state, actions}
})

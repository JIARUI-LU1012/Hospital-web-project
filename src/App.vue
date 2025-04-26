<script setup>
import { ref, provide, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import request from '@/utils/request';
import {useChatStore} from '@/stores/chat';

const useChat = useChatStore()

const socket = ref(null);


onMounted(() => {
  socket.value = new WebSocket(request.wsURL)

  socket.value.onopen = () => {
    console.log('WebSocket The connection is open');
  };

  socket.value.onmessage = (event) => {
    const msg = JSON.parse(event.data)
    console.log('The message has been received', msg);

    if(msg.type === 'join') {
      useChat.state.chatList = msg.chatList
    } else {
      useChat.state.chatList.push(msg)
    }
  };

  socket.value.onclose = () => {
    console.log('WebSocket The connection has been close');
  };
});

provide('socket', socket);

</script>

<template>
  <RouterView />
</template>

<style scoped>
@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>

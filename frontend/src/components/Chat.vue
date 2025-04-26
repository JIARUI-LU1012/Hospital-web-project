<template>
  <el-dialog
    top="5vh"
    v-model="dialogVisible"
    title=""
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="() => dialogVisible = false"
  >
    <div class="container">
      <el-card class="card">
        <template #header>
          <div class="card-header">
            <span>{{ props.person.nickname }}</span>
          </div>
        </template>
        <div class="card-body" ref="chatWindow">
          <div v-for="(item, index) in useChat.state.chatList" :key="index">
            <div v-if="userStore.state._id === item.toId" class="left">
              <Image class="avatar" :src="item.fromAvatar"/>
              <div class="content">{{ item.content }}</div>
            </div>
            <div v-else class="right">
              <div class="content">{{ item.content }}</div>
              <Image class="avatar" :src="userStore.state.avatar"/>
            </div>
          </div>
        </div>
        <template #footer>
          <el-input v-model="userInput" type="textarea" placeholder="Enter the content of the chat..."/>
          <div style="float: right">
            <el-button type="primary" @click="onSend" size="small" :disabled="!userInput">Send</el-button>
          </div>
        </template>
      </el-card>
    </div>

  </el-dialog>

</template>

<script setup>
import {ref, inject, nextTick, defineProps, watch, defineEmits} from 'vue'
import {useUserStore} from '../stores/user';
import Image from "@/components/Image.vue";
import {useChatStore} from '@/stores/chat';

const useChat = useChatStore()
const userStore = useUserStore();

const props = defineProps({
  open: {
    type: Boolean,
    required: false,
    default: false,
  },
  person: {
    type: Object,
  }
})
const emit = defineEmits(['update:open']);

const dialogVisible = ref(props.open);

watch(() => props.open, (newValue) => {
  dialogVisible.value = newValue;
});

watch(dialogVisible, (newValue) => {
  emit('update:open', newValue);
});

const userInput = ref('')
const chatWindow = ref(null)
const scrollToBottom = () => {
  if (chatWindow.value) {
    chatWindow.value.scrollTo({
      top: chatWindow.value.scrollHeight,
      behavior: 'smooth',
    });
  }
};

const socket = inject('socket');
socket.value.send(JSON.stringify({
  type: 'join',
  clientId: userStore.state._id
}))

const onSend = () => {
  const message = {
    type: 'chat',
    fromId: userStore.state._id,
    fromAvatar: userStore.state.avatar,
    toId: props.person._id,
    toAvatar: props.person.avatar,
    content: userInput.value
  }
  socket.value.send(JSON.stringify(message))
  useChat.state.chatList.push(message)
  userInput.value = ''
  nextTick(() => {
    scrollToBottom()
  })
}
</script>

<style>
.el-card__body {
  padding: 0;
}
</style>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;

  .card {
    width: 700px;
    height: 650px;
    background-color: rgb(248, 248, 248);
  }

  .card-body {
    height: 480px;
    overflow-y: auto;

    .left {
      display: flex;
      margin: 10px;

      .content {
        background-color: white;
      }
    }

    .right {
      display: flex;
      justify-content: flex-end;
      margin: 10px;

      .content {
        background-color: rgb(209, 227, 255);
      }
    }

    .content {
      padding: 4px 10px;
      border-radius: 5px;
      max-width: 60%;
      word-break: break-all;
    }

    img {
      margin: 0 4px;
    }

  }

}

</style>


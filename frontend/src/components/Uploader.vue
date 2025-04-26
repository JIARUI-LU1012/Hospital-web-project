<template>
  <el-upload
    class="avatar-uploader"
    :action="request.baseURL + '/upload'"
    :show-file-list="false"
    :limit="1"
    :on-success="handleAvatarSuccess"
  >
    <img v-if="state.avatar" :src="request.baseURL + '/' + state.avatar" class="avatar-preview" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { reactive } from 'vue'
import request from '@/utils/request'
import {Plus,} from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
})
const emit = defineEmits(['update:modelValue'])

const state = reactive({
  avatar: props.modelValue,
})

const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  console.log(response, uploadFile)
  state.avatar = response.data
  emit('update:modelValue', response.data)
}
</script>

<style scoped lang="scss">
.avatar-preview {
  width: 100px;
  height: 100%;
}
.avatar-uploader{
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.el-icon.avatar-uploader-icon {
  width: 40px;
  height: 40px;
}
</style>

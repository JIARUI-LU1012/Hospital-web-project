<template>
  <img :src="request.baseURL + '/' + props.src" />
</template>

<script setup>
import request from '@/utils/request'

const props = defineProps({
  src: {
    type: String,
    default: null,
  },
})
</script>

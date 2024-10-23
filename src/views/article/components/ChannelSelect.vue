<script setup>
import { GetActicleService } from '@/api/acticle'
import { ref, defineProps, defineEmits } from 'vue'
// 数据
const channelList = ref([])

// 定义 props
defineProps({
  modelValue: {
    type: [String, Number], // 根据需要调整类型
    required: true,
  },
  width: {
    type: String,
  },
})
// 定义 emit 事件
const emit = defineEmits(['update:modelValue'])

const getChannelList = async () => {
  const res = await GetActicleService()
  channelList.value = res.data.data
}
getChannelList()
</script>

<template>
  <el-select :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)" :style="{ width }">
    <el-option v-for="item in channelList" :key="item.id" :label="item.cate_name" :value="item.id" />
  </el-select>
</template>
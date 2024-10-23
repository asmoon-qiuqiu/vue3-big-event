<script setup>
import { DelActicleService, GetActicleService } from '@/api/acticle';
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'

const acticleList = ref([])
const loading = ref(false)
const dialog = ref()

const getActicleList = async () => {
  loading.value = true
  const res = await GetActicleService()
  acticleList.value = res.data.data
  loading.value = false
}
getActicleList()

// 操作编辑删除方法
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm(
    '你确定删除吗?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  await DelActicleService(row.id)
  getActicleList()
}

const onActicle = () => {
  dialog.value.open({})
}
// 接收子传来的通信，更新页面
const onUpdate = () => {
  getActicleList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #button>
      <el-button @click="onActicle" type="primary"> 添加分类 </el-button>
    </template>
    <el-table :data="acticleList" v-loading="loading" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row, $index }">
          <el-button :icon="Edit" circle plain type="primary" @click="onEditChannel(row, $index)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="onDelChannel(row, $index)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <ChannelEdit ref="dialog" @update="onUpdate"></ChannelEdit>

  </page-container>
</template>

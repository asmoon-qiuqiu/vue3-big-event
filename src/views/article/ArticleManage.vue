<script setup>
import { ref } from "vue"
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from "./components/ChannelSelect.vue"
import { DelActicle, GetActiclListeService } from "@/api/acticle"
import { formatTime } from '@/utils/format'
const loading = ref(false)
import ArticleEdit from "./components/ArticleEdit.vue"
// 数据
const articleList = ref([])
// 总条数
const total = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
// 基于params参数，获取文章列表
const getAcrticelList = async () => {
  loading.value = true
  const res = await GetActiclListeService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false

}

// 处理分页逻辑
const handleSizeChange = (size) => {
  // 变化从第一页开始
  params.value.pagenum = 1
  params.value.pagesize = size
  getAcrticelList()
}
const handleCurrentChange = (page) => {
  params.value.pagenum = page // 更新当前页
  getAcrticelList()
}

const onSearch = () => {
  params.value.pagenum = 1
  getAcrticelList()
}

const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getAcrticelList()
}
getAcrticelList()

// 添加文章
const ArticleEditRef = ref()
const onAddArticle = (row) => {
  ArticleEditRef.value.open(row)
}

// 编辑删除按钮
const onEditArticle = (row) => {
  ArticleEditRef.value.open(row)
}
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm(
    '你确定删除吗?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  await DelActicle(row.id)
  getAcrticelList()
}

// 添加或者编辑，成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getAcrticelList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #button>
      <el-button @click="onAddArticle" type="primary"> 添加文章 </el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline label-width="auto">
      <el-form-item label="文章分类">
        <ChannelSelect v-model="params.cate_id" width="150px"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态" v-model="params.state">
        <el-select v-model="params.state" style="width: 150px">
          <el-option label="已发布" value="已发布"> </el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column prop="title" label="文章标题" width="250">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发布时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="onEditArticle(row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="onDeleteArticle(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination v-model:current-page="params.pagenum" v-model:page-size="params.pagesize" :page-sizes="[2, 3, 5, 10]"
      :background="true" layout="jumper, total, sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
    <ArticleEdit ref="ArticleEditRef" @pubSuccess="onSuccess"></ArticleEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>
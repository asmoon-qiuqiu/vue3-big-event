<script setup>
import { AddActicleService, UpdataActicleService } from '@/api/acticle';
import { ref } from 'vue'
const dialogVisible = ref(false)
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
// 获取表单
const formRef = ref()
// 表单规则
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}
// 1. open({ }) => 添加操作，添加表单初始化无数据
// 2. open({ id: xx,  ...  }) => 编辑操作，编辑表单初始化需回显
const open = async (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}
// 子传父重新更新页面
const emit = defineEmits(['update'])
// 提交确认
const onSubmit = async () => {
  await formRef.value.validate()
  // 定义表单id
  const isEdit = formModel.value.id
  if (isEdit) {
    await UpdataActicleService(formModel.value)
  } else {
    await AddActicleService(formModel.value)
  }
  dialogVisible.value = false
  emit('update')
}
// 暴露方法
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="formModel.id ? '编辑分类' : '添加分类'" width="30%">
    <el-form ref="formRef" :model="formModel" :rules="rules" label-width="100px" style="padding-right: 60px">
      <el-form-item prop="cate_name" label="分类名称">
        <el-input v-model="formModel.cate_name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item prop="cate_alias" label="分类别名">
        <el-input v-model="formModel.cate_alias" placeholder="请输入分类别名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

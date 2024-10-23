<script setup>
import ChannelSelect from './ChannelSelect.vue'
import { ref } from "vue"
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artEditService, artGetDetailService, PublishActiclListeService } from '@/api/acticle'
import { baseURL } from '@/utils/request'
import axios from 'axios'
const visibleDrawer = ref(false)

//  准备数据
const defaultForm = {
  title: '', // 标题
  cate_id: '', // 分类id
  cover_img: '', // 图片file对象
  content: '', // string内容
  state: '' // 状态
}
// 准备数据
const formModel = ref({ ...defaultForm })
// 富文本
const editRef = ref()
// 1. open({ }) => 添加操作，添加表单初始化无数据
// 2. open({ id: xx,  ...  }) => 编辑操作，编辑表单初始化需回显
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    // 需要基于row.id发送请求,获取编辑对象的详细数据,区分添加编辑
    const res = await artGetDetailService(row.id)
    formModel.value = res.data.data
    // 图片需要单独处理回显
    imgUrl.value = baseURL + formModel.value.cover_img

    // 提交给后台，需要的是 file 格式的，将网络图片，转成 file 格式
    // 网络图片转成 file 对象, 需要转换一下
    formModel.value.cover_img = await imageUrlToFile(imgUrl.value, formModel.value.cover_img)
  } else {
    formModel.value = { ...defaultForm } // 基于默认数据重置form数据
    // 图片上传地址和富文本内容重置
    imgUrl.value = ''
    editRef.value.setHTML('')
  }
}

// 图片上传逻辑
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

// 发布文章
const emit = defineEmits(['pubSuccess'])
const onPublish = async (state) => {
  // 将已发布还是草稿状态，存入 state
  formModel.value.state = state
  // 转换 formData 数据
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  // 判断
  if (formModel.value.id) {
    // 编辑操作
    await artEditService(fd)
    visibleDrawer.value = false
    emit('pubSuccess', 'edit')
  } else {
    // 添加请求
    await PublishActiclListeService(fd)
    visibleDrawer.value = false
    emit('pubSuccess', 'add')
  }
}

defineExpose({
  open
})
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageData = response.data;

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] });

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error);
    throw error;
  }
}
</script>

<template>
  <el-drawer v-model="visibleDrawer" :title="formModel.id ? '编辑文章' : '添加文章'" direction="rtl" size="50%">
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 关闭el-plus自动上传。无需配置action等属性,
          URL.createObjectURL创建一个可以在浏览器中直接使用的临时URL,
          来预览上传的文件无需上传到服务器 -->
        <el-upload class="avatar-uploader" :show-file-list="false" :on-change="onSelectFile" :auto-upload="false">
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor ref="editRef" v-model:content="formModel.content" content-type="html" theme="snow" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
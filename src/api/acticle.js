import request from '@/utils/request'

//获取文章分类
export const GetActicleService = () => {
  return request.get('/my/cate/list')
}

// 添加文章分类
export const AddActicleService = ({ cate_name, cate_alias }) => {
  return request.post('/my/cate/add', { cate_name, cate_alias })
}

// 更新文章分类
export const UpdataActicleService = (data) => {
  return request.put('/my/cate/info', data)
}

// 删除文章分类
export const DelActicleService = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}

// 获取文章列表
export const GetActiclListeService = (params) => {
  return request.get('/my/article/list', {
    params
  })
}

// 发布文章列表
// data 需要form-data格式对象
export const PublishActiclListeService = (data) => {
  return request.post('/my/article/add', data)
}

// 获取文章详情
export const artGetDetailService = (id) => {
  return request.get('my/article/info', { params: { id } })
}

// 文章管理 更新-文章详情
export const artEditService = (data) => {
  return request.put('my/article/info', data)
}
// 文章管理 更新-文章详情
export const DelActicle = (id) => {
  return request.delete('/my/article/info', {
    params: { id }
  })
}
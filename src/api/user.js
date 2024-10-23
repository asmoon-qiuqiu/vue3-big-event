import request from '@/utils/request'

// 注册接口
export const useRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}

// 登录接口
export const uesLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}

// 获取用户基本信息
export const useGetinfoService = () => {
  return request.get('/my/userinfo')
}

// 更新个人信息
export const userUpdateInfoService = ({ id, nickname, email }) => {
  return request.put('/my/userinfo', { id, nickname, email })
}

// 更新用户头像
export const userUploadAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', { avatar })
}


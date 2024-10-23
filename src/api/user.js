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

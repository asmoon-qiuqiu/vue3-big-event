import { useGetinfoService } from "@/api/user"
import { defineStore } from "pinia"
import { ref } from 'vue'
// 用户模块 token setToken removeToken
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const setToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }

  // 用户基本信息
  const user = ref({})
  const getUserInfo = async () => {
    const res = await useGetinfoService() //获取数据
    user.value = res.data.data
  }

  // 清空用户基本信息
  const removeUserInfo = (obj) => {
    user.value = obj
  }

  return {
    token,
    setToken,
    removeToken,
    user,
    getUserInfo,
    removeUserInfo
  }
},
  {
    persist: true,
  }
)
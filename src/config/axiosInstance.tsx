import axios from 'axios'

import { removeAdminFromLocalStorage } from '@/components/hooks/useQueryAdmin'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

axiosInstance.interceptors.response.use((response) => {
  if (response.data?.status === 401 && response.data?.path && !response.data?.path.includes('login')) {
    return new Promise((resolve, reject) => {
      axios
        .get('/admin/authentication/refresh', {
          baseURL: import.meta.env.VITE_API_URL,
          timeout: 30000,
          withCredentials: true
        })
        .then(({ data }) => {
          if (data.status === 401) {
            removeAdminFromLocalStorage()
          }
          location.reload()
        })
        .catch((err) => {
          reject(err)
          console.log(err)
        })
    })
  }
  return response
})

export default axiosInstance

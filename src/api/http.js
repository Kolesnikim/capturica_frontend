import axios from 'axios'
import router from '@/router'

const HTTP = axios.create({
  baseURL: '/api/v4'
})

HTTP.interceptors.response.use(
  response => {
    // console.log(response.status)
    return response
  },
  err => {
    const {status} = err.response
    if (status === 401) {
      router.push('/auth')
    }
    return Promise.reject(err)
  }
)

export default HTTP

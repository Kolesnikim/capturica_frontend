import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'http://95.213.248.92:8000/api/v5'
})

HTTP.interceptors.response.use(
  response => {
    return response
  },
  err => {
    const {status} = err.response
    if (status === 401) {
      this.$router.push('/auth')
    }
    return Promise.reject(err)
  }
)

export default HTTP

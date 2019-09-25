import axios from 'axios'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})


axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})


function errorState(response) {
  console.log(response)
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
      // 如果不需要除了data之外的数据，可以直接 return response.data
  }else{
    // 异常状态下，把错误信息返回去
    return {
      status: -404,
      msg: '网络异常'
    }
  }
  
}

 

export default axios
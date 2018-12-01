import axios from 'axios';
// const config = {
//   mockHost: '//localhost:8088',
//   onlineHost: '//www.1bitcode.xyz'
// };
var http = axios.create({
//   baseURL:
//     process.env.NODE_ENV === 'production' ? config.onlineHost : config.mockHost,
  timeout: 4000,
  changeOrigin: true,
  withCredentials: process.env.NODE_ENV === 'production' ? true : false
});
// //返回状态判断(添加响应拦截器)
// http.interceptors.response.use(
//   res => {
//     //对响应数据做些事
// 	return res;
// },
//   error => {
// 	console.log(error);
// }
// );

export default http;
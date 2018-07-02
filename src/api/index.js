import axios from 'axios';

// axios.create({
//    headers: { 'Content-Type': 'application/json;charset=utf-8' }
// });
const base = '';

let host = 'http://121.40.241.35:3000';

export const getUserLoginInfo = params => { 
console.log('请求了')
  return axios.post('api/login', params).then(res => res.data)
};
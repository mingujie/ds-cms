import axios from 'axios';

axios.create({
   headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

let host = 'http://121.40.241.35:3000';

export const getUserLoginInfo = params => { 
console.log('请求了')
  return axios.post(`${host}/login`, params).then(res => res.data)
};
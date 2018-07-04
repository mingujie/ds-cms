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

export const createCourseCategory = params => { 
  return axios.post('api/course/category', params).then(res => res.data)
};


//课程创建
export const createCourseSubject = params => { 
  return axios.post('api/course/subject', params).then(res => res.data)
};
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
  return axios.post('/api/course/category', params).then(res => res.data)
};


//课程创建
export const createCourseSubject = params => { 
  return axios.post('/api/course/subject', params).then(res => res.data)
};


//课程分类

/**
 * getCourseSectionPage 获取课程列表
 * @param  {pageNum} params [description]
 * @return {[type]}        [description]
 */
export const getCourseSectionPage = params => { 
  return axios.get(`/api/course/category/page`, { params: params });
};
/**
 * addCourseSection 新增课程分类
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const addCourseSection = params => { 
  return axios.post(`/api/course/category`, params).then(res => res.data)
};